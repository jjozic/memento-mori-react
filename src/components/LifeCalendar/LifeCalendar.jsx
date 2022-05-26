import { useState, useEffect } from "react";
import useStickyState from "../../hooks/useStickyState";

const MONTHS = 12;
const YEARS = 80;

const createCalendar = (ageInMonths = 0) => {
  let cells = [];
  for (let i = 0; i < MONTHS * YEARS; i++) {
    const cellID = `cell${i}`;
    const color = i < ageInMonths ? "bg-indigo-400" : "bg-gray-100";
    cells.push(
      <div className={`${color} m-0.5 w-4 h-4 border-2 border-black rounded-sm`} key={cellID} id={cellID}></div>
    );
  }
  return cells;
};

const calculateAgeInMonths = (birthday) => {
  const date = new Date(birthday);
  let timeDiff = Date.now() - date.getTime();

  // assume 30 days for each month to keep things simple
  return Math.round(timeDiff / (24 * 3600 * 1000 * 30));
};

const LifeCalendar = () => {
  // const [birthday, setBirthday] = useState(Date.now());
  const [calendar, setCalendar] = useState(createCalendar());
  const [birthday, setBirthday] = useStickyState(Date.now(), "birthday");

  useEffect(() => {
    setCalendar(createCalendar(calculateAgeInMonths(birthday)));
  }, [birthday]);

  const handleChange = (event) => {
    setBirthday(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setCalendar(createCalendar(calculateAgeInMonths(birthday)));
  };

  return (
    <div className="flex-0 lg:flex-1 py-8 px-4">
      <h2 className="font-bold pb-8 text-lg">Life Calendar</h2>
      <label htmlFor="start">Date of birth: </label>
      <input
        className="border-2 rounded p-1"
        type="date"
        id="start"
        name="trip-start"
        min="1900-01-01"
        max="2022-01-01"
        value={birthday}
        onChange={handleChange}
      />
      <p className="pt-4">
        The average human life span is around 80 years. This is a visual representaiton of how much time has already
        passed by in your life. Use it as a reminder to think about your own mortality (Memento Mori). Each Cell
        represents one month of your life.
      </p>
      <div className="py-4 flex flex-wrap gap-1">{calendar}</div>
    </div>
  );
};

export default LifeCalendar;
