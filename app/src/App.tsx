import Background from './components/Background'
import Chat from './components/Chat'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Nav from './components/Nav'
import UseCases from './components/UseCases'
import { useChat } from './hooks/useChat'

export default function App() {
  const { messages, loading, sendMessage } = useChat()

  return (
    <div className="eg-root">
      <Background />
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Nav />
        <Hero />
        <Chat messages={messages} loading={loading} sendMessage={sendMessage} />
        <UseCases onTry={sendMessage} />
        <Footer />
      </div>
    </div>
  )
}
