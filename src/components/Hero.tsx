import { useState, useEffect, useRef, useCallback } from 'react'
import { executeCommand, type TerminalLine } from '../utils/terminalCommands'
import MatrixRain from './MatrixRain'
import Confetti from './Confetti'

const PROMPT = 'guest@oscarbennich.github.io:~$ '
const COMMAND = 'cat about.txt'
const INTRO_OUTPUT: TerminalLine[] = [
  { text: "Hi! 👋 I'm Oscar Bennich-Björkman." },
  { text: "Full Stack Developer & Tech Lead @ Viedoc in Uppsala, Sweden." },
]

const CHAR_DELAY = 80
const INITIAL_PAUSE = 1000
const POST_COMMAND_PAUSE = 500
const LINE_DELAY = 300

type Phase = 'waiting' | 'typing' | 'pausing' | 'output' | 'interactive'

interface HistoryEntry {
  command: string
  output: TerminalLine[]
}

function Hero(): React.ReactElement {
  const [phase, setPhase] = useState<Phase>('waiting')
  const [typedChars, setTypedChars] = useState(0)
  const [visibleLines, setVisibleLines] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [specialEffect, setSpecialEffect] = useState<string | null>(null)
  const [exitEffect, setExitEffect] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

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
    if (visibleLines >= INTRO_OUTPUT.length) {
      setPhase('interactive')
      return
    }
    const timer = setTimeout(() => setVisibleLines((l) => l + 1), LINE_DELAY)
    return () => clearTimeout(timer)
  }, [phase, visibleLines])

  // Auto-scroll to bottom
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [history, visibleLines, phase])

  // Focus input when interactive
  useEffect(() => {
    if (phase === 'interactive') {
      inputRef.current?.focus()
    }
  }, [phase])

  // Clear special effects after a duration
  useEffect(() => {
    if (!specialEffect) return
    const duration = specialEffect === 'matrix' ? 5000 : specialEffect === 'party' ? 4000 : 2000
    const timer = setTimeout(() => setSpecialEffect(null), duration)
    return () => clearTimeout(timer)
  }, [specialEffect])

  const handleCommand = useCallback(
    (input: string) => {
      const trimmed = input.trim().toLowerCase()

      if (trimmed === 'clear') {
        setHistory([])
        setUserInput('')
        return
      }

      const result = executeCommand(input, commandHistory)

      setHistory((prev) => [...prev, { command: input, output: result.output }])
      if (input.trim()) {
        setCommandHistory((prev) => [...prev, input.trim()])
      }
      setUserInput('')
      setHistoryIndex(-1)

      if (result.specialEffect === 'exit') {
        setTimeout(() => setExitEffect(true), 500)
      } else if (result.specialEffect) {
        setSpecialEffect(result.specialEffect)
      }
    },
    [commandHistory]
  )

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(userInput)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length === 0) return
      const newIndex =
        historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1)
      setHistoryIndex(newIndex)
      setUserInput(commandHistory[newIndex])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex === -1) return
      const newIndex = historyIndex + 1
      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1)
        setUserInput('')
      } else {
        setHistoryIndex(newIndex)
        setUserInput(commandHistory[newIndex])
      }
    }
  }

  const focusInput = () => {
    if (phase === 'interactive') {
      inputRef.current?.focus()
    }
  }

  const showCursorOnPrompt = phase === 'waiting' || phase === 'typing'

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4">
      {/* Matrix effect */}
      {specialEffect === 'matrix' && <MatrixRain />}

      {/* Party effect */}
      {specialEffect === 'party' && <Confetti />}

      {/* Glitch effect */}
      {specialEffect === 'glitch' && (
        <div className="fixed inset-0 z-50 pointer-events-none animate-glitch" />
      )}

      <div
        ref={terminalRef}
        onClick={focusInput}
        className={`relative z-10 w-full max-w-4xl rounded-lg overflow-hidden border border-gray-700 shadow-2xl transition-opacity duration-1000 ${
          exitEffect ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
          <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
          <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
          <span className="flex-1 text-center text-xs text-gray-400 font-mono -ml-14">
            guest@oscarbennich.github.io — bash
          </span>
        </div>

        {/* Terminal body */}
        <div
          ref={bodyRef}
          className="bg-gray-950 p-6 sm:p-8 md:p-10 font-mono text-base sm:text-lg md:text-xl min-h-[280px] max-h-[60vh] overflow-y-auto cursor-text"
        >
          {/* Initial cat about.txt command line */}
          <div className="flex">
            <span className="text-green-400 whitespace-pre">{PROMPT}</span>
            <span className="text-gray-100">
              {COMMAND.slice(0, typedChars)}
            </span>
            {showCursorOnPrompt && (
              <span className="caret text-gray-100">█</span>
            )}
          </div>

          {/* about.txt output lines */}
          {INTRO_OUTPUT.slice(0, visibleLines).map((line, i) => (
            <div key={`intro-${i}`} className="text-gray-300 mt-2">
              {line.text}
            </div>
          ))}

          {/* Command history */}
          {phase === 'interactive' &&
            history.map((entry, i) => (
              <div key={`hist-${i}`} className="mt-4">
                {entry.command !== '' && (
                  <div className="flex">
                    <span className="text-green-400 whitespace-pre">
                      {PROMPT}
                    </span>
                    <span className="text-gray-100">{entry.command}</span>
                  </div>
                )}
                {entry.output.map((line, j) => (
                  <div
                    key={`out-${i}-${j}`}
                    className={line.className || 'text-gray-300'}
                  >
                    {line.isLink ? (
                      <a
                        href={line.href}
                        target={line.href?.startsWith('/#/') ? undefined : '_blank'}
                        rel={line.href?.startsWith('/#/') ? undefined : 'noopener noreferrer'}
                        className={line.className || 'text-blue-400 hover:underline'}
                      >
                        {line.text}
                      </a>
                    ) : (
                      <span className="whitespace-pre">{line.text}</span>
                    )}
                  </div>
                ))}
              </div>
            ))}

          {/* Interactive input line */}
          {phase === 'interactive' && !exitEffect && (
            <div className="flex mt-4 items-center relative">
              <span className="text-green-400 whitespace-pre">{PROMPT}</span>
              <span className="text-gray-100 whitespace-pre">{userInput}</span>
              <span className="caret text-gray-100">█</span>
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
                dir="ltr"
                className="absolute inset-0 opacity-0 caret-transparent"
                autoFocus
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                aria-label="Terminal input"
              />
            </div>
          )}
        </div>
      </div>

      {/* Hint text */}
      {phase === 'interactive' && !exitEffect && (
        <p className="text-gray-600 font-mono text-xs sm:text-sm mt-4 z-10">
          Type <span className="text-gray-400">help</span> to see available commands
        </p>
      )}
    </section>
  )
}

export default Hero
