import { useState, useRef, useMemo, memo, useCallback, useEffect } from "react";
import useStickyState from "../../hooks/useStickyState";

const LIFE_YEARS = 90;
const MONTHS_TOTAL = LIFE_YEARS * 12;
const MONTHS_PER_ROW = 36; // 3 years per row

interface CalendarCellProps {
  isPassed: boolean;
  ageYear: number;
  monthIndex: number;
}

const CalendarCell = memo(
  ({ isPassed, ageYear }: CalendarCellProps) => {
    return (
      <div className="group relative -m-0.5 p-0.5">
        <div
          className={`h-2 w-2 border border-[rgba(26,15,10,0.2)] transition-all duration-200 ease-out md:h-3 md:w-3 lg:h-3.5 lg:w-3.5 ${
            isPassed
              ? "border-border-color bg-border-color [box-shadow:inset_0_0_2px_rgba(0,0,0,0.3)]"
              : "bg-transparent"
          } group-hover:z-20 group-hover:scale-125 group-hover:border-accent-red group-hover:bg-accent-red group-hover:shadow-[0_0_4px_rgba(138,28,28,0.4)]`}
        />
        {/* Tooltip (pure CSS show/hide, no React state) */}
        <div className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 -translate-x-1/2 rounded-sm bg-ink-primary px-2 py-1 text-[0.7rem] font-[var(--font-display)] tracking-wider whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity duration-150 ease-out group-hover:opacity-100">
          Age {ageYear}
          <div className="absolute top-full left-1/2 -mt-px -translate-x-1/2 border-4 border-transparent border-t-ink-primary"></div>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Only re-render if isPassed changes (ageYear and monthIndex don't affect rendering)
    return prevProps.isPassed === nextProps.isPassed;
  },
);

CalendarCell.displayName = "CalendarCell";

interface CalendarRowProps {
  row: CalendarCellData[];
  monthsPassed: number;
  rowIndex: number;
  isLastRow: boolean;
}

const CalendarRow = memo(
  ({ row, monthsPassed, isLastRow }: CalendarRowProps) => {
    return (
      <div className="relative flex">
        {/* Calendar Row */}
        <div className="flex gap-0.5 sm:gap-1 lg:gap-1.5">
          {row.map((cell) => (
            <CalendarCell
              key={`cell${cell.monthIndex}`}
              isPassed={cell.monthIndex < monthsPassed}
              ageYear={cell.ageYear}
              monthIndex={cell.monthIndex}
            />
          ))}
        </div>
        {/* Right Label - Death on last row */}
        {isLastRow && (
          <div className="ml-1.5 flex h-full items-center text-[0.65rem] font-[var(--font-display)] tracking-wider text-ink-secondary opacity-40 sm:ml-2 sm:text-[0.7rem] md:ml-3 md:text-[0.75rem] lg:ml-4">
            Death
          </div>
        )}
      </div>
    );
  },
);

CalendarRow.displayName = "CalendarRow";

interface CalendarCellData {
  monthIndex: number;
  ageYear: number;
}

const createCalendarData = (): CalendarCellData[][] => {
  const rows: CalendarCellData[][] = [];
  const totalRows = Math.ceil(MONTHS_TOTAL / MONTHS_PER_ROW);

  for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
    const rowCells: CalendarCellData[] = [];
    const startMonth = rowIndex * MONTHS_PER_ROW;

    for (let i = 0; i < MONTHS_PER_ROW; i++) {
      const monthIndex = startMonth + i;
      if (monthIndex >= MONTHS_TOTAL) break;

      const ageYear = Math.floor(monthIndex / 12);
      rowCells.push({ monthIndex, ageYear });
    }

    rows.push(rowCells);
  }

  return rows;
};

const calculateAgeInMonths = (birthday: string): number => {
  const dob = new Date(birthday);

  // Handle invalid dates gracefully
  if (Number.isNaN(dob.getTime())) {
    return 0;
  }

  const now = new Date();

  let monthsPassed = (now.getFullYear() - dob.getFullYear()) * 12;
  monthsPassed -= dob.getMonth();
  monthsPassed += now.getMonth();

  // Clamp to valid range 0..LIFE_YEARS
  return Math.max(0, Math.min(monthsPassed, MONTHS_TOTAL));
};

const getDefaultBirthday = (): string => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 30);
  return date.toISOString().split("T")[0];
};

const LifeCalendar = () => {
  // Persisted birthday (localStorage via useStickyState)
  const [storedBirthday, setStoredBirthday] = useStickyState<string>(
    "",
    "birthday",
  );

  // Track if birthday has been confirmed/submitted
  const [birthdayConfirmed, setBirthdayConfirmed] = useStickyState<boolean>(
    false,
    "birthdayConfirmed",
  );

  // What the user is currently typing in the input
  const [inputBirthday, setInputBirthday] = useState<string>(
    storedBirthday || getDefaultBirthday(),
  );

  // Birthday actually used to render the calendar
  const [calendarBirthday, setCalendarBirthday] = useState<string>(
    storedBirthday || getDefaultBirthday(),
  );

  const gridRef = useRef<HTMLDivElement>(null);

  // Keep input + calendar in sync if storedBirthday changes externally
  useEffect(() => {
    if (storedBirthday) {
      setInputBirthday(storedBirthday);
      setCalendarBirthday(storedBirthday);
    }
  }, [storedBirthday]);

  // Memoize calendar structure - only create once
  const calendarData = useMemo(() => createCalendarData(), []);

  // Calculate monthsPassed from the calendar birthday
  const monthsPassed = useMemo(
    () => calculateAgeInMonths(calendarBirthday),
    [calendarBirthday],
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputBirthday(event.target.value);
    },
    [],
  );

  const handleSubmit = useCallback(() => {
    if (!inputBirthday) return;

    const parsed = new Date(inputBirthday);
    if (Number.isNaN(parsed.getTime())) {
      return;
    }

    setCalendarBirthday(inputBirthday);
    setStoredBirthday(inputBirthday);
    setBirthdayConfirmed(true);
  }, [inputBirthday, setStoredBirthday, setBirthdayConfirmed]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  const handleChangeBirthday = useCallback(() => {
    setBirthdayConfirmed(false);
    setInputBirthday(storedBirthday || getDefaultBirthday());
  }, [storedBirthday, setBirthdayConfirmed]);

  // Show input form if birthday not confirmed
  if (!birthdayConfirmed) {
    return (
      <div className="flex flex-col lg:pl-6">
        {/* Calendar Input Section - replaces calendar grid */}
        <div className="flex min-h-[400px] flex-col items-center justify-center py-8 text-center">
          <label
            htmlFor="dob"
            className="block text-[0.85rem] font-[var(--font-display)] tracking-widest text-ink-secondary sm:text-[0.9rem]"
          >
            Enter your Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            className="mt-4 w-full max-w-[200px] cursor-pointer border-0 border-b-2 border-ink-primary bg-transparent text-center text-[1.3rem] font-[var(--font-body)] text-ink-primary outline-none focus:border-accent-red sm:text-[1.5rem]"
            min="1900-01-01"
            max={new Date().toISOString().split("T")[0]}
            value={inputBirthday}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSubmit}
            disabled={!inputBirthday}
            className="mt-6 rounded-sm border border-ink-primary bg-transparent px-6 py-2 text-[0.9rem] font-[var(--font-display)] tracking-wider text-ink-primary transition-colors hover:bg-ink-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-ink-primary"
          >
            View Calendar
          </button>
          <div className="mx-auto mt-8 max-w-[600px] px-2 text-[0.9rem] text-ink-secondary sm:text-[1rem]">
            <p>
              The average human life span is around <strong>90 years</strong>.
              This chart maps the days of your life. Filled squares are time
              spent. Empty squares are time remaining.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show calendar if birthday is confirmed
  return (
    <div className="flex min-w-0 flex-col lg:pl-6">
      {/* Change Birthday Button */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={handleChangeBirthday}
          className="rounded-sm border border-ink-secondary bg-transparent px-4 py-1.5 text-[0.75rem] font-[var(--font-display)] tracking-wider text-ink-secondary transition-colors hover:bg-ink-secondary hover:text-white sm:text-[0.8rem]"
        >
          Change Birthday
        </button>
      </div>

      {/* Grid Legend */}
      <div className="mb-3 flex justify-center gap-6 text-[0.7rem] font-[var(--font-display)] tracking-widest text-ink-secondary uppercase sm:gap-10 sm:text-[0.75rem]">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 border border-border-color bg-border-color sm:h-3 sm:w-3"></div>
          <span>Passed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 border border-ink-primary sm:h-3 sm:w-3"></div>
          <span>Remaining</span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="w-full max-w-full overflow-x-auto pb-3 2xl:overflow-x-visible">
        <div className="mx-auto flex w-max pr-4 2xl:pr-0" ref={gridRef}>
          {/* Left Labels Column - Sticky on mobile scroll */}
          <div className="sticky left-0 z-10 flex flex-col justify-start gap-0.5 bg-bg-parchment pr-2 lg:relative lg:z-0 lg:bg-transparent">
            {calendarData.map((row, rowIndex) => {
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
            {calendarData.map((row, rowIndex) => {
              const totalRows = Math.ceil(MONTHS_TOTAL / MONTHS_PER_ROW);
              const isLastRow = rowIndex === totalRows - 1;

              return (
                <CalendarRow
                  key={`row-${rowIndex}`}
                  row={row}
                  monthsPassed={monthsPassed}
                  rowIndex={rowIndex}
                  isLastRow={isLastRow}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifeCalendar;
