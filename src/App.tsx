import { DailyQuote, LifeCalendar, Footer, NavBar } from "./components";

function App() {
  return (
    <>
      <NavBar />
      <div className="mx-auto mb-6 w-full max-w-[1800px] px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="layout-grid">
          <div className="min-w-0">
            <DailyQuote />
          </div>
          <div className="min-w-0">
            <LifeCalendar />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
