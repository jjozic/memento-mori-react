import { useState, useEffect } from "react";
import axios from "axios";

const STOICURL = "https://stoic-server.herokuapp.com/random";

const authors = ["aurelius", "seneca", "epictetus"];

const DailyQuote = () => {
  const [quote, setQuote] = useState(null);
  const [bgName, setBgName] = useState(null);

  useEffect(() => {
    axios.get(STOICURL).then((response) => {
      setQuote(response.data[0]);
      const resp = response.data[0].author.toLowerCase();
      for (const author of authors) {
        if (resp.includes(author)) {
          setBgName(author);
        }
      }
    });
  }, []);

  return (
    <div className="flex-1 py-8 px-4">
      <h2 className="font-bold pb-8 text-lg">Daily Inspiration</h2>
      {quote && (
        <div className={`py-8 bg-${bgName} bg-opacity-2 bg-no-repeat bg-center min-h-200`}>
          <figure className="text-center text-gray-700">
            <blockquote className="font-bold italic">"{quote.body}"</blockquote>
            <figcaption>-{` ${quote.author}`}</figcaption>
          </figure>
        </div>
      )}
    </div>
  );
};

export default DailyQuote;
