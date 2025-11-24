import { useState, useEffect } from "react";
import useStickyState from "../../hooks/useStickyState";

const LIFE_YEARS = 80;
const MONTHS_TOTAL = LIFE_YEARS * 12;

const createCalendar = (monthsPassed = 0) => {
  let cells = [];
  for (let i = 0; i < MONTHS_TOTAL; i++) {
    const cellID = `cell${i}`;
    const ageYear = Math.floor(i / 12);
    const isPassed = i < monthsPassed;
    cells.push(
      <div
        className={`h-2 w-2 border border-[rgba(26,15,10,0.2)] transition-all duration-300 ease-in-out md:h-3 md:w-3 ${
          isPassed
            ? "border-ink-primary bg-ink-primary [box-shadow:inset_0_0_2px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        } hover:z-10 hover:scale-[2] hover:border-accent-red hover:bg-accent-red`}
        key={cellID}
        id={cellID}
        title={`Age: ${ageYear}`}
      ></div>,
    );
  }
  return cells;
};

const calculateAgeInMonths = (birthday: string): number => {
  const dob = new Date(birthday);
  const now = new Date();

  let monthsPassed = (now.getFullYear() - dob.getFullYear()) * 12;
  monthsPassed -= dob.getMonth();
  monthsPassed += now.getMonth();

  return monthsPassed;
};

const getDefaultBirthday = (): string => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 30);
  return date.toISOString().split("T")[0];
};

const LifeCalendar = () => {
  const [calendar, setCalendar] = useState(createCalendar());
  const [birthday, setBirthday] = useStickyState<string>(
    getDefaultBirthday(),
    "birthday",
  );

  useEffect(() => {
    const monthsPassed = calculateAgeInMonths(birthday);
    setCalendar(createCalendar(monthsPassed));
  }, [birthday]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBirthday(event.target.value);
  };

  return (
    <div className="flex flex-col">
      {/* Calendar Input Section */}
      <div className="mb-[50px] border-t border-b border-[rgba(62,43,38,0.2)] py-10 text-center md:border-t-0">
        <label
          htmlFor="dob"
          className="mb-5 block text-[0.9rem] font-[var(--font-display)] tracking-widest text-ink-secondary"
        >
          Enter your Date of Birth
        </label>
        <input
          type="date"
          id="dob"
          className="w-[200px] cursor-pointer border-0 border-b-2 border-ink-primary bg-transparent text-center text-[1.5rem] font-[var(--font-body)] text-ink-primary outline-none focus:border-accent-red"
          min="1900-01-01"
          max={new Date().toISOString().split("T")[0]}
          value={birthday}
          onChange={handleChange}
        />

        <div className="mx-auto mt-[30px] max-w-[600px] text-[1.2rem] text-ink-secondary">
          <p>
            The average human life span is around <strong>80 years</strong>.
            This chart maps the days of your life. Filled squares are time
            spent. Empty squares are time remaining.
          </p>
        </div>
      </div>

      {/* Grid Legend */}
      <div className="mb-5 flex justify-center gap-10 text-[0.75rem] font-[var(--font-display)] tracking-widest text-ink-secondary uppercase">
        <div className="flex items-center gap-2.5">
          <div className="h-2 w-2 border border-ink-primary bg-ink-primary md:h-3 md:w-3"></div>
          <span>Passed</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="h-2 w-2 border border-ink-primary md:h-3 md:w-3"></div>
          <span>Remaining</span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex w-full justify-center">
        <div className="flex max-w-[760px] flex-wrap justify-center gap-1 md:gap-1">
          {calendar}
        </div>
      </div>
    </div>
  );
};

export default LifeCalendar;
