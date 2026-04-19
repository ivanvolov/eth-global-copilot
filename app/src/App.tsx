import Nav from './components/Nav'
import Hero from './components/Hero'
import WhatsInside from './components/WhatsInside'
import Archive from './components/Archive'
import Questions from './components/Questions'
import Install from './components/Install'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-60" />
        <div className="absolute left-1/2 top-[-20%] h-[60rem] w-[60rem] -translate-x-1/2 rounded-full bg-eth-purple/20 blur-[140px] animate-float-slow" />
        <div className="absolute right-[-10%] top-[30%] h-[40rem] w-[40rem] rounded-full bg-eth-blue/15 blur-[120px] animate-float-slow" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[45rem] w-[45rem] rounded-full bg-eth-cyan/10 blur-[140px] animate-float-slow" />
      </div>

      <Nav />
      <main>
        <Hero />
        <WhatsInside />
        <Archive />
        <Questions />
        <Install />
      </main>
      <Footer />
    </div>
  )
}
