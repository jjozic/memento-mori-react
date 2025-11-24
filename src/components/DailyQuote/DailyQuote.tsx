import { useState, useEffect, useRef } from "react";
import axios from "axios";

const stoicUrl = "https://stoic-quotes.com/api/quote";

type StoicQuoteResponse = {
  text: string;
  author: string;
};

// Local images from public folder
const authorImages: Record<string, string> = {
  Seneca: "/seneca.png",
  "Marcus Aurelius": "/aurelius.png",
  Epictetus: "/epictetus.png",
  default: "/aurelius.png", // Fallback to Marcus Aurelius
};

const DailyQuote = () => {
  const [quote, setQuote] = useState<StoicQuoteResponse | null>(null);
  const [bgImageUrl, setBgImageUrl] = useState(authorImages["default"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | undefined>(undefined);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    // Prevent double fetch in Strict Mode
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    setLoading(true);
    setError(undefined);

    try {
      const response = await axios.get(stoicUrl);
      const resp = response.data as StoicQuoteResponse;

      setQuote(resp);

      // Resolve Image
      let imgUrl = authorImages["default"];
      const authorKeys = Object.keys(authorImages);

      // Simple check to find which philosopher key is in the author name string
      for (let key of authorKeys) {
        if (resp.author.includes(key)) {
          imgUrl = authorImages[key];
          break;
        }
      }

      setBgImageUrl(imgUrl);
    } catch (error: unknown) {
      setError(error);
      // Fallback quote
      setQuote({
        text: "The happiness of your life depends upon the quality of your thoughts.",
        author: "Marcus Aurelius",
      });
      setBgImageUrl(authorImages["Marcus Aurelius"]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative mb-[50px] flex min-h-[400px] w-full flex-col items-center justify-center overflow-hidden border border-ink-primary bg-bg-paper p-[40px_20px] text-center shadow-[0_0_0_4px_var(--color-bg-parchment),0_0_0_6px_var(--color-ink-primary),15px_15px_30px_rgba(0,0,0,0.15)] md:mb-0 md:p-[60px]">
      {/* Background Image Layer */}
      <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full overflow-hidden">
        <img
          src={bgImageUrl}
          alt="Philosopher Statue"
          className="h-full w-full object-cover opacity-[0.15] mix-blend-multiply contrast-120 grayscale sepia-40 transition-opacity duration-500 ease-in-out"
          onError={(e) => {
            (e.target as HTMLImageElement).src = authorImages["default"];
          }}
        />
        {/* Vignette overlay to focus center */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,var(--color-bg-paper)_100%)]"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-[1] max-w-[80%]">
        {quote ? (
          <>
            <div
              className={`mb-[30px] text-[1.6rem] leading-[1.3] text-ink-primary italic transition-opacity duration-300 [text-shadow:0_1px_0_rgba(255,255,255,0.5)] md:text-[2.2rem] ${
                loading ? "opacity-30" : "opacity-100"
              }`}
            >
              "{quote.text}"
            </div>
            <cite className="mt-5 block border-t border-accent-gold pt-[15px] text-[1.1rem] font-black tracking-widest text-accent-red">
              - {quote.author}
            </cite>
          </>
        ) : error ? (
          <div className="text-ink-primary">
            Oops! Something went wrong... Please try again later!
          </div>
        ) : (
          <div className="text-ink-primary">Loading...</div>
        )}
      </div>

      {/* Button */}
      <button
        className={`absolute bottom-[30px] left-1/2 z-[2] min-w-[220px] -translate-x-1/2 transform cursor-pointer border-2 border-ink-primary bg-transparent px-[35px] py-[15px] text-[0.9rem] font-bold tracking-[0.15em] whitespace-nowrap text-ink-primary transition-all duration-300 ease-in-out hover:bg-ink-primary hover:text-bg-parchment hover:shadow-[0_5px_15px_rgba(0,0,0,0.2)] disabled:cursor-not-allowed disabled:opacity-50`}
        onClick={fetchQuote}
        disabled={loading}
      >
        {loading ? "Consulting..." : "Consult the Oracles"}
      </button>
    </div>
  );
};

export default DailyQuote;
