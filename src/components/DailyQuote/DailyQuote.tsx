import { useState, useEffect } from "react";
import axios from "axios";

const stoicUrl = "https://stoic-quotes.com/api/quote";

const authors = ["aurelius", "seneca", "epictetus"];

const DailyQuote = () => {
  type StoicQuoteResponse = {
    text: string;
    author: "Seneca" | "Marcus Aurelius" | "Epictetus";
  };
  const [quote, setQuote] = useState<StoicQuoteResponse | null>(null);
  const [bgName, setBgName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchQoute();
  }, []);

  const fetchQoute = () => {
    setLoading(true);
    axios.get(stoicUrl).then((response) => {
      setQuote(response.data[0] satisfies StoicQuoteResponse);
      const resp = response.data[0].author.toLowerCase();
      for (const author of authors) {
        if (resp.includes(author)) {
          setBgName(author);
        }
      }
      setLoading(false);
    });
  };

  return (
    <div className="flex-1 py-8 px-4 flex flex-col gap-2">
      <h2 className="font-bold pb-8 text-lg">Daily Inspiration</h2>
      {quote ? (
        <div className={`py-8 bg-${bgName} bg-opacity-2 bg-no-repeat bg-center min-h-200`}>
          <figure className="text-center text-gray-700">
            <blockquote className="font-bold italic">"{quote.text}"</blockquote>
            <figcaption>-{` ${quote.author}`}</figcaption>
          </figure>
        </div>
      ) : (
        <span>Loading...</span>
      )}
      <button
        className={`text-gray-100 px-6 py-2 rounded-lg self-center ${
          loading ? "bg-gray-500 cursor-not-allowed" : "bg-gray-800"
        } `}
        onClick={fetchQoute}
        disabled={loading}
      >
        Get another quote
      </button>
    </div>
  );
};

export default DailyQuote;
