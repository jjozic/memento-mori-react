import { DailyQuote, LifeCalendar, Footer, NavBar } from "./components";

function App() {
  return (
    <>
      <NavBar />
      <div className="mb-6 w-full max-w-[1400px] px-3 sm:px-4 md:px-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[40%_60%] lg:gap-12 xl:grid-cols-[40%_60%] xl:gap-14">
          <DailyQuote />
          <LifeCalendar />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
