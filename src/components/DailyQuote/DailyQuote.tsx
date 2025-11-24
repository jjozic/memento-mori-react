import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

const stoicUrl = "https://stoic-quotes.com/api/quote";

const authors = ["Seneca", "Marcus Aurelius", "Epictetus"] as const;
type Authors = typeof authors;
type StoicQuoteResponse = {
  text: string;
  author: Authors;
};

const DailyQuote = () => {
  const [quote, setQuote] = useState<StoicQuoteResponse | null>(null);
  const [bgName, setBgName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | undefined>(undefined);

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    setLoading(true);

    try {
      const response = await axios.get(stoicUrl);
      const resp = response.data as StoicQuoteResponse;

      setQuote(resp);

      const matchingAuthor = authors.find((author) => resp.author.includes(author));
      if (matchingAuthor) {
        // Map author names to image file names
        const authorImageMap: Record<string, string> = {
          Seneca: "seneca",
          "Marcus Aurelius": "aurelius",
          Epictetus: "epictetus",
        };
        setBgName(authorImageMap[matchingAuthor] || "");
      }
    } catch (error: unknown) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const backgroundImageStyle = bgName
    ? {
        backgroundImage: `url(/${bgName}.png)`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        opacity: 0.15,
      }
    : {};

  return (
    <div className="flex-1 py-8 px-4 flex flex-col gap-4">
      <h2 className="font-bold pb-4 text-lg">Daily Inspiration</h2>
      {quote ? (
        <div className="py-8 min-h-[300px] flex items-center justify-center" style={backgroundImageStyle}>
          <figure className="text-center text-gray-700 max-w-2xl">
            <blockquote className="font-bold italic text-lg">"{quote.text}"</blockquote>
            <figcaption className="mt-4">-{` ${quote.author}`}</figcaption>
          </figure>
        </div>
      ) : error ? (
        <span>Oops! Something went wrong... Please try again later!</span>
      ) : (
        <span>Loading...</span>
      )}
      <button
        className={`text-gray-100 px-6 py-2 rounded-lg self-center mt-4 ${
          loading ? "bg-gray-500 cursor-not-allowed" : "bg-gray-800"
        } `}
        onClick={fetchQuote}
        disabled={loading}
      >
        Get another quote
      </button>
    </div>
  );
};

export default DailyQuote;
