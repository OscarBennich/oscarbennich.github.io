import { useState, useEffect, useRef } from 'react'

const PROMPT = 'oscar@site:~$ '
const COMMAND = 'whoami'
const OUTPUT_LINES = [
  'Oscar Bennich-Björkman',
  'Tech Lead && Full Stack Developer',
  'Uppsala, Sweden',
]

const CHAR_DELAY = 80
const INITIAL_PAUSE = 1000
const POST_COMMAND_PAUSE = 500
const LINE_DELAY = 300

type Phase = 'waiting' | 'typing' | 'pausing' | 'output' | 'done'

function Hero(): React.ReactElement {
  const [phase, setPhase] = useState<Phase>('waiting')
  const [typedChars, setTypedChars] = useState(0)
  const [visibleLines, setVisibleLines] = useState(0)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Phase 1: Initial pause with blinking cursor
  useEffect(() => {
    const timer = setTimeout(() => setPhase('typing'), INITIAL_PAUSE)
    return () => clearTimeout(timer)
  }, [])

  // Phase 2: Type command character by character
  useEffect(() => {
    if (phase !== 'typing') return
    if (typedChars >= COMMAND.length) {
      setPhase('pausing')
      return
    }
    const timer = setTimeout(() => setTypedChars((c) => c + 1), CHAR_DELAY)
    return () => clearTimeout(timer)
  }, [phase, typedChars])

  // Phase 3: Pause after command is typed
  useEffect(() => {
    if (phase !== 'pausing') return
    const timer = setTimeout(() => setPhase('output'), POST_COMMAND_PAUSE)
    return () => clearTimeout(timer)
  }, [phase])

  // Phase 4: Show output lines one by one
  useEffect(() => {
    if (phase !== 'output') return
    if (visibleLines >= OUTPUT_LINES.length) {
      setPhase('done')
      return
    }
    const timer = setTimeout(() => setVisibleLines((l) => l + 1), LINE_DELAY)
    return () => clearTimeout(timer)
  }, [phase, visibleLines])

  const showCursorOnPrompt = phase === 'waiting' || phase === 'typing'
  const showCursorOnNewLine = phase === 'done'

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4">
      <div
        ref={terminalRef}
        className="relative z-10 w-full max-w-4xl rounded-lg overflow-hidden border border-gray-700 shadow-2xl"
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
          <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
          <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
          <span className="flex-1 text-center text-xs text-gray-500 font-mono -ml-14">
            oscar@site — bash
          </span>
        </div>

        {/* Terminal body */}
        <div className="bg-gray-950 p-6 sm:p-8 md:p-10 font-mono text-base sm:text-lg md:text-xl min-h-[280px]">
          {/* Command line */}
          <div className="flex">
            <span className="text-green-400">{PROMPT}</span>
            <span className="text-gray-100">
              {COMMAND.slice(0, typedChars)}
            </span>
            {showCursorOnPrompt && <span className="caret text-gray-100">█</span>}
          </div>

          {/* Output lines */}
          {OUTPUT_LINES.slice(0, visibleLines).map((line, i) => (
            <div key={i} className="text-gray-300 mt-2">
              {line}
            </div>
          ))}

          {/* New prompt line */}
          {showCursorOnNewLine && (
            <div className="flex mt-4">
              <span className="text-green-400">{PROMPT}</span>
              <span className="caret text-gray-100">█</span>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .caret {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </section>
  )
}

export default Hero
