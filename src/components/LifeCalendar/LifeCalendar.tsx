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
        className={`w-2 h-2 md:w-3 md:h-3 border border-[rgba(26,15,10,0.2)] transition-all duration-300 ease-in-out ${
          isPassed
            ? "bg-[var(--color-ink-primary)] border-[var(--color-ink-primary)] [box-shadow:inset_0_0_2px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        } hover:scale-[2] hover:bg-[var(--color-accent-red)] hover:border-[var(--color-accent-red)] hover:z-10`}
        key={cellID}
        id={cellID}
        title={`Age: ${ageYear}`}
      ></div>
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
  const [birthday, setBirthday] = useStickyState<string>(getDefaultBirthday(), "birthday");

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
      <div className="text-center mb-[50px] py-10 border-t border-b border-[rgba(62,43,38,0.2)] md:border-t-0">
        <label
          htmlFor="dob"
          className="block font-[var(--font-display)] text-[0.9rem] tracking-[0.1em] mb-5 text-[var(--color-ink-secondary)]"
        >
          Enter your Date of Birth
        </label>
        <input
          type="date"
          id="dob"
          className="font-[var(--font-body)] text-[1.5rem] bg-transparent border-0 border-b-2 border-[var(--color-ink-primary)] text-[var(--color-ink-primary)] outline-none text-center w-[200px] cursor-pointer focus:border-[var(--color-accent-red)]"
          min="1900-01-01"
          max={new Date().toISOString().split("T")[0]}
          value={birthday}
          onChange={handleChange}
        />

        <div className="max-w-[600px] mt-[30px] mx-auto text-[1.2rem] text-[var(--color-ink-secondary)]">
          <p>
            The average human life span is around <strong>80 years</strong>. This chart maps the days of your life.
            Filled squares are time spent. Empty squares are time remaining.
          </p>
        </div>
      </div>

      {/* Grid Legend */}
      <div className="flex justify-center gap-10 mb-5 font-[var(--font-display)] text-[0.75rem] tracking-[0.1em] uppercase text-[var(--color-ink-secondary)]">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 md:w-3 md:h-3 border border-[var(--color-ink-primary)] bg-[var(--color-ink-primary)]"></div>
          <span>Passed</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 md:w-3 md:h-3 border border-[var(--color-ink-primary)]"></div>
          <span>Remaining</span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex justify-center w-full">
        <div className="flex flex-wrap max-w-[760px] gap-1 md:gap-1 justify-center">{calendar}</div>
      </div>
    </div>
  );
};

export default LifeCalendar;
