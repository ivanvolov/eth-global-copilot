import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Loader2, Sparkles } from 'lucide-react'
import EthMark from './EthMark'
import { suggestedQuestions, type Message } from '../data/answers'

type Props = {
  messages: Message[]
  loading: boolean
  sendMessage: (text: string) => void
}

export default function Chat({ messages, loading, sendMessage }: Props) {
  const [input, setInput] = useState('')
  const [focused, setFocused] = useState(false)
  const chatEndRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const submit = (text?: string) => {
    const content = (text ?? input).trim()
    if (!content || loading) return
    sendMessage(content)
    setInput('')
    window.setTimeout(() => inputRef.current?.focus(), 50)
  }

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <section id="try" className="chat-section-pad" style={{ position: 'relative' }}>
      <div className="container-md">
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: 24,
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div>
            <div className="label-mono c-cream-40" style={{ marginBottom: 8 }}>
              001 · Try the copilot
            </div>
            <h2 className="font-display h-lg">
              Ask it <em className="c-gold">anything</em>.
            </h2>
          </div>
        </div>

        <div
          className="glow-ring"
          style={{
            position: 'relative',
            borderRadius: 16,
            border: '1px solid rgba(236,232,225,0.1)',
            background: 'linear-gradient(180deg, #14141a 0%, #0e0e12 100%)',
            overflow: 'hidden',
          }}
        >
          <div
            className="bg-cream-02"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 20px',
              borderBottom: '1px solid rgba(236,232,225,0.1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: 9999, background: '#3a3a42' }} />
                <span style={{ width: 10, height: 10, borderRadius: 9999, background: '#3a3a42' }} />
                <span style={{ width: 10, height: 10, borderRadius: 9999, background: '#3a3a42' }} />
              </div>
              <span
                className="font-mono c-cream-40"
                style={{ fontSize: 11, marginLeft: 12 }}
              >
                copilot.ethglobal
              </span>
            </div>
            <div className="c-cream-40" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Sparkles size={13} />
              <span className="label-mono" style={{ fontSize: 10 }}>
                demo
              </span>
            </div>
          </div>

          <div
            className="chat-scroll"
            style={{ padding: '24px 20px', height: 380, overflowY: 'auto' }}
          >
            {messages.length === 0 && (
              <div
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <div
                  className="font-display c-cream-90"
                  style={{ fontSize: 'clamp(22px, 3.4vw, 32px)', lineHeight: 1.25, marginBottom: 32 }}
                >
                  What would you build <em className="c-gold">this weekend</em>?
                </div>
                <div>
                  <div
                    className="label-mono c-cream-30"
                    style={{ marginBottom: 12, fontSize: 10 }}
                  >
                    Suggested
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {suggestedQuestions.map((q) => (
                      <button
                        key={q}
                        onClick={() => submit(q)}
                        className="group bg-cream-02 hv-bg-cream-06 hv-b-gold-40 t-all"
                        style={{
                          padding: '12px 16px',
                          borderRadius: 8,
                          border: '1px solid rgba(236,232,225,0.1)',
                          textAlign: 'left',
                          width: '100%',
                          cursor: 'pointer',
                          color: 'inherit',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span className="c-cream-80 hv-c-cream" style={{ fontSize: 14 }}>
                          {q}
                        </span>
                        <ArrowRight size={14} className="c-cream-30 arrow-slide hv-c-gold" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  marginBottom: 24,
                  display: 'flex',
                  justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                {m.role === 'user' ? (
                  <div
                    className="bg-cream c-ink"
                    style={{
                      maxWidth: '85%',
                      borderRadius: 16,
                      borderBottomRightRadius: 4,
                      padding: '12px 16px',
                      lineHeight: 1.5,
                      fontSize: 14,
                    }}
                  >
                    {m.content}
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: 16, maxWidth: '100%' }}>
                    <div style={{ flexShrink: 0, marginTop: 4 }}>
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 9999,
                          border: '1px solid rgba(200,164,107,0.5)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <EthMark size={12} />
                      </div>
                    </div>
                    <div
                      className="prose-chat c-cream-85"
                      style={{ flex: 1, fontSize: 15, lineHeight: 1.65, whiteSpace: 'pre-wrap' }}
                    >
                      {m.content}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                <div style={{ flexShrink: 0, marginTop: 4 }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 9999,
                      border: '1px solid rgba(200,164,107,0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <EthMark size={12} />
                  </div>
                </div>
                <div
                  className="c-cream-50 cursor-blink"
                  style={{ fontSize: 15, lineHeight: 1.65, flex: 1 }}
                >
                  Searching archive, hackathon index, and ecosystem data
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div
            className="bg-cream-02"
            style={{
              borderTop: '1px solid rgba(236,232,225,0.1)',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div
              className="font-mono c-gold"
              style={{ fontSize: 15, lineHeight: '22px', flexShrink: 0 }}
            >
              &gt;
            </div>
            <div style={{ flex: 1, position: 'relative', height: 22 }}>
              {!input.length && !focused && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    fontSize: 15,
                    lineHeight: '22px',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <span className="c-cream-40 cursor-blink">
                    Compare gaming submissions between ETHGlobal NYC and Bangkok
                  </span>
                </div>
              )}
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                rows={1}
                className="c-cream"
                style={{
                  width: '100%',
                  height: 22,
                  background: 'transparent',
                  outline: 'none',
                  resize: 'none',
                  fontSize: 15,
                  lineHeight: '22px',
                  padding: 0,
                  margin: 0,
                  fontFamily: 'inherit',
                  border: 'none',
                  display: 'block',
                }}
              />
            </div>
            <button
              onClick={() => submit()}
              disabled={loading || !input.trim()}
              className="bg-gold c-ink hv-bg-cream t-bg"
              style={{
                flexShrink: 0,
                width: 40,
                height: 40,
                borderRadius: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                opacity: loading || !input.trim() ? 0.3 : 1,
              }}
            >
              {loading ? <Loader2 size={16} className="spin-fast" /> : <ArrowRight size={16} />}
            </button>
          </div>
        </div>

        <div
          className="font-mono c-cream-30"
          style={{ marginTop: 16, textAlign: 'center', fontSize: 11 }}
        >
          Demo preview · pre-canned sample responses. The real skill runs in Claude Code.
        </div>
      </div>
    </section>
  )
}
