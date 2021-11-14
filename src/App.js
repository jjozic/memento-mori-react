import { NavBar, DailyQuote, LifeCalendar, Footer } from '@components'

function App() {
  return (
    <>
      <NavBar />
      <main className="flex flex-wrap max-w-screen-xl mx-auto">
        <DailyQuote
          quote="Be tolerant with others and strict with yourself."
          author="Marcus Aurelius"
        />
        <LifeCalendar />
      </main>
      <Footer />
    </>
  );
}

export default App
