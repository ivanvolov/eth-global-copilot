import { useState } from 'react'
import { lookupAnswer, type Message } from '../data/answers'

export type ChatApi = {
  messages: Message[]
  loading: boolean
  sendMessage: (text: string) => void
}

export function useChat(): ChatApi {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  const sendMessage = (text: string) => {
    const content = text.trim()
    if (!content || loading) return

    const next: Message[] = [...messages, { role: 'user', content }]
    setMessages(next)
    setLoading(true)

    const delay = 700 + Math.random() * 600
    window.setTimeout(() => {
      const reply = lookupAnswer(content)
      setMessages((m) => [...m, { role: 'assistant', content: reply }])
      setLoading(false)
    }, delay)
  }

  return { messages, loading, sendMessage }
}
