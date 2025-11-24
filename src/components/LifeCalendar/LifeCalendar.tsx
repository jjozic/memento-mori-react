import { useState, useEffect, useRef } from "react";
import useStickyState from "../../hooks/useStickyState";

const LIFE_YEARS = 80;
const MONTHS_TOTAL = LIFE_YEARS * 12;
const MONTHS_PER_ROW = 36; // 3 years per row

const createCalendar = (monthsPassed = 0) => {
  const rows: Array<Array<React.ReactElement>> = [];
  const totalRows = Math.ceil(MONTHS_TOTAL / MONTHS_PER_ROW);

  for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
    const rowCells = [];
    const startMonth = rowIndex * MONTHS_PER_ROW;

    for (let i = 0; i < MONTHS_PER_ROW; i++) {
      const monthIndex = startMonth + i;
      if (monthIndex >= MONTHS_TOTAL) break;

      const cellID = `cell${monthIndex}`;
      const ageYear = Math.floor(monthIndex / 12);
      const isPassed = monthIndex < monthsPassed;

      rowCells.push(
        <div
          className={`h-2 w-2 border border-[rgba(26,15,10,0.2)] transition-all duration-300 ease-in-out md:h-3 md:w-3 lg:h-3.5 lg:w-3.5 ${
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

    rows.push(rowCells);
  }

  return rows;
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
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const monthsPassed = calculateAgeInMonths(birthday);
    setCalendar(createCalendar(monthsPassed));
  }, [birthday]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBirthday(event.target.value);
  };

  return (
    <div className="flex flex-col lg:pl-6">
      {/* Calendar Input Section */}
      <div className="py-s4 mb-4 border-t border-b border-[rgba(62,43,38,0.2)] pb-4 text-center md:border-t-0">
        <label
          htmlFor="dob"
          className="block text-[0.85rem] font-[var(--font-display)] tracking-widest text-ink-secondary sm:text-[0.9rem]"
        >
          Enter your Date of Birth
        </label>
        <input
          type="date"
          id="dob"
          className="w-full max-w-[200px] cursor-pointer border-0 border-b-2 border-ink-primary bg-transparent text-center text-[1.3rem] font-[var(--font-body)] text-ink-primary outline-none focus:border-accent-red sm:text-[1.5rem]"
          min="1900-01-01"
          max={new Date().toISOString().split("T")[0]}
          value={birthday}
          onChange={handleChange}
        />

        <div className="mx-auto mt-[15px] max-w-[600px] px-2 text-[0.9rem] text-ink-secondary sm:text-[1rem]">
          <p>
            The average human life span is around <strong>80 years</strong>.
            This chart maps the days of your life. Filled squares are time
            spent. Empty squares are time remaining.
          </p>
        </div>
      </div>

      {/* Grid Legend */}
      <div className="mb-3 flex justify-center gap-6 text-[0.7rem] font-[var(--font-display)] tracking-widest text-ink-secondary uppercase sm:gap-10 sm:text-[0.75rem]">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 border border-ink-primary bg-ink-primary sm:h-3 sm:w-3"></div>
          <span>Passed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 border border-ink-primary sm:h-3 sm:w-3"></div>
          <span>Remaining</span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex w-full justify-center overflow-x-auto pb-2 lg:overflow-x-visible">
        <div className="flex" ref={gridRef}>
          {/* Left Labels Column - Sticky on mobile scroll */}
          <div className="sticky left-0 z-10 flex flex-col justify-start gap-0.5 bg-bg-parchment pr-2 lg:relative lg:z-0 lg:bg-transparent">
            {calendar.map((row, rowIndex) => {
              const startMonth = rowIndex * MONTHS_PER_ROW;

              // Check if this row contains a year milestone: birth (0), 30, 60
              let leftLabel: string | null = null;

              // Check for birth (age 0) - first row
              if (rowIndex === 0 && startMonth === 0) {
                leftLabel = "Birth";
              } else {
                // Check for age 30 (month 360)
                const age30Month = 30 * 12; // 360 months
                const endMonth = Math.min(
                  startMonth + MONTHS_PER_ROW - 1,
                  MONTHS_TOTAL - 1,
                );
                if (age30Month >= startMonth && age30Month <= endMonth) {
                  leftLabel = "30";
                }
                // Check for age 60 (month 720)
                const age60Month = 60 * 12; // 720 months
                if (age60Month >= startMonth && age60Month <= endMonth) {
                  leftLabel = "60";
                }
              }

              return (
                <div
                  key={`label-${rowIndex}`}
                  className="flex min-h-[8px] items-center justify-end text-right text-[0.65rem] font-[var(--font-display)] tracking-wider text-ink-secondary opacity-40 sm:min-h-[10px] sm:text-[0.7rem] md:min-h-[12px] md:text-[0.75rem] lg:pr-2"
                >
                  {leftLabel || ""}
                </div>
              );
            })}
          </div>

          {/* Calendar Grid Column */}
          <div className="flex flex-col gap-0.5">
            {calendar.map((row, rowIndex) => {
              const totalRows = Math.ceil(MONTHS_TOTAL / MONTHS_PER_ROW);
              const isLastRow = rowIndex === totalRows - 1;

              return (
                <div key={`row-wrapper-${rowIndex}`} className="relative flex">
                  {/* Calendar Row */}
                  <div className="flex gap-0.5 sm:gap-1 lg:gap-1.5">{row}</div>
                  {/* Right Label - Death on last row */}
                  {isLastRow && (
                    <div className="ml-1.5 flex h-full items-center text-[0.65rem] font-[var(--font-display)] tracking-wider text-ink-secondary opacity-40 sm:ml-2 sm:text-[0.7rem] md:ml-3 md:text-[0.75rem] lg:ml-4">
                      Death
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifeCalendar;
