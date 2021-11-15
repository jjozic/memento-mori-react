const MONTHS = 12;
const YEARS = 80;

const LifeCalendar = () => {
  const createCalendar = () => {
    let cells = [];
    for (let i = 0; i < MONTHS * YEARS; i++) {
      const cellID = `cell${i}`;
      const color = i < 30 ? "bg-red-500" : "bg-gray-100";
      cells.push(
        <div className={`${color} m-0.5 w-4 h-4 border-2 border-black rounded-sm`} key={cellID} id={cellID}></div>
      );
    }
    return cells;
  };

  return (
    <div className="flex-0 md:flex-1 py-8 px-4">
      <h2 className="font-bold pb-8 text-lg">Life Calendar</h2>
      <div className="flex flex-col max-w-xs gap-1">
        <label for="start">Birth date:</label>
        <input className="border-2 rounded p-1" type="date" id="start" name="trip-start" min="1900-01-01" max="today" />
        <button className="bg-gray-800 text-white rounded p-1">Submit</button>
      </div>

      <p className="pt-4">
        The average human life span is around 80 years. This is a visual representaiton of how much time has already
        passed by in your life. Use it as a reminder to think about your own mortality (Memento Mori). Each Cell
        represents one month of your life.
      </p>
      <div className="py-4 flex flex-wrap gap-1">{createCalendar()}</div>
    </div>
  );
};

export default LifeCalendar;
