const DailyQuote = ({quote, author}) => {
  return (
    <div className="p-10">
        <figure className="text-center">
          <blockquote>
            "{quote}"
          </blockquote>
          <figcaption>-{` ${author}`}</figcaption>
        </figure>
    </div>
  );
};

export default DailyQuote;
