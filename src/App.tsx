import { DailyQuote, LifeCalendar, Footer, NavBar } from "./components";

function App() {
  return (
    <>
      <NavBar />
      <div className="w-full max-w-[1200px] px-5 mb-[60px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DailyQuote />
          <LifeCalendar />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
