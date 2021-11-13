import { NavBar, DailyQuote, Footer } from '@components'

function App() {
  return (
    <>
      <NavBar />
      <main>
        <DailyQuote
          quote="Be tolerant with others and strict with yourself."
          author="Marcus Aurelius"
        />
      </main>
      <Footer />
    </>
  );
}

export default App
