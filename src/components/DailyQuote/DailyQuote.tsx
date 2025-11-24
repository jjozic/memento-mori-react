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
    <div className="relative w-full min-h-[400px] bg-[var(--color-bg-paper)] border border-[var(--color-ink-primary)] shadow-[0_0_0_4px_var(--color-bg-parchment),0_0_0_6px_var(--color-ink-primary),15px_15px_30px_rgba(0,0,0,0.15)] flex flex-col justify-center items-center p-[40px_20px] md:p-[60px] overflow-hidden md:mb-0 mb-[50px] text-center">
      {/* Background Image Layer */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <img
          src={bgImageUrl}
          alt="Philosopher Statue"
          className="w-full h-full object-cover opacity-[0.15] grayscale sepia-[40%] contrast-[120%] mix-blend-multiply transition-opacity duration-500 ease-in-out"
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
              className={`text-[1.6rem] md:text-[2.2rem] leading-[1.3] italic mb-[30px] text-[var(--color-ink-primary)] [text-shadow:0_1px_0_rgba(255,255,255,0.5)] transition-opacity duration-300 ${
                loading ? "opacity-30" : "opacity-100"
              }`}
            >
              "{quote.text}"
            </div>
            <cite className="font-[var(--font-display)] font-black text-[1.1rem] tracking-[0.1em] text-[var(--color-accent-red)] block mt-5 border-t border-[var(--color-accent-gold)] pt-[15px] inline-block">
              - {quote.author}
            </cite>
          </>
        ) : error ? (
          <div className="text-[var(--color-ink-primary)]">Oops! Something went wrong... Please try again later!</div>
        ) : (
          <div className="text-[var(--color-ink-primary)]">Loading...</div>
        )}
      </div>

      {/* Button */}
      <button
        className={`absolute bottom-[30px] left-1/2 transform -translate-x-1/2 z-[2] bg-transparent border-2 border-[var(--color-ink-primary)] px-[35px] py-[15px] text-[0.9rem] font-bold tracking-[0.15em] cursor-pointer transition-all duration-300 ease-in-out text-[var(--color-ink-primary)] hover:bg-[var(--color-ink-primary)] hover:text-[var(--color-bg-parchment)] hover:shadow-[0_5px_15px_rgba(0,0,0,0.2)] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap min-w-[220px]`}
        onClick={fetchQuote}
        disabled={loading}
      >
        {loading ? "Consulting..." : "Consult the Oracles"}
      </button>
    </div>
  );
};

export default DailyQuote;
