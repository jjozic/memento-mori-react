import { NavBar, DailyQuote, LifeCalendar, Footer } from '@components'

function App() {
  return (
    <>
      <NavBar />
      <main className="flex flex-wrap max-w-screen-xl mx-auto min-h-full">
        <DailyQuote />
        <LifeCalendar />
      </main>
      <Footer />
    </>
  );
}

export default App
