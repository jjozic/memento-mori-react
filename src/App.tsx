import { DailyQuote, LifeCalendar, Footer, NavBar } from "./components";

function App() {
  return (
    <>
      <NavBar />
      <div className="mb-[60px] w-full max-w-[1200px] px-5">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <DailyQuote />
          <LifeCalendar />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
