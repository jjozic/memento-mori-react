const DailyQuote = ({ quote, author }) => {
  return (
    <div className="flex-1 py-8 px-4">
      <h2 className="font-bold pb-8">Daily Inspiration</h2>
      <div className="py-8 bg-aurelius bg-opacity-2 bg-no-repeat bg-center min-h-200">
        <figure className="text-center text-gray-700">
          <blockquote className="font-bold italic">"{quote}"</blockquote>
          <figcaption>-{` ${author}`}</figcaption>
        </figure>
      </div>
    </div>
  );
};

export default DailyQuote;
