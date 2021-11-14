const WEEKS = 36;
const YEARS = 30;

const LifeCalendar = () => {
  const createCalendar = () => {
    let rows = [];
    for (let i = 0; i < YEARS; i++) {
      let rowID = `row${i}`;
      let cell = [];
      for (let idx = 0; idx < WEEKS; idx++) {
        let cellID = `cell${i}-${idx}`;
        cell.push(<td className="bg-green-400 p-1 border-2 border-gray-200" key={cellID} id={cellID}></td>);
      }
      rows.push(
        <tr key={i} id={rowID}>
          {cell}
        </tr>
      );
    }
    return rows;
  };

  const createCalendar2 = () => {
    let rows = [];
    for (let i = 0; i < YEARS; i++) {
      let rowID = `row${i}`;
      let cell = [];
      for (let idx = 0; idx < WEEKS; idx++) {
        let cellID = `cell${i}-${idx}`;
        cell.push(
          <div className="bg-gray-100 m-0.5 w-3 h-3 border-2 border-black rounded-sm" key={cellID} id={cellID}></div>
        );
      }
      rows.push(
        <div className="flex -md:justify-center" key={i} id={rowID}>
          {cell}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="flex-1 py-8 px-4">
      <h2 className="font-bold pb-8">Life Calendar</h2>
      <div>{createCalendar2()}</div>
    </div>
  );
};

export default LifeCalendar;
