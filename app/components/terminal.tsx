'use client'

import { useState, useRef, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

interface CommandHistory {
  command: string
  output: string
  loading?: boolean
}

const getRandomMetric = () => {
  const metrics = [
    "Titans neutralized: 42",
    "Wall integrity: 78%",
    "ODM gear fuel: 89%",
    "Survey Corps morale: 65%",
    "Eren's anger level: 9001",
    "Potato consumption rate: 156%",
    "Levi's cleaning supplies: Critically low",
    "Colossal Titan appearances: 3",
    "Mikasa's scarf condition: Slightly frayed",
    "Armin's strategic plans: 12",
    "Beast Titan rock throws: 78",
    "Hange's titan experiments: 23",
  ]
  return metrics[Math.floor(Math.random() * metrics.length)]
}

export default function Terminal() {
  const [history, setHistory] = useState<CommandHistory[]>([])
  const [currentCommand, setCurrentCommand] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const terminalRef = useRef<HTMLDivElement>(null)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(v => !v)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  const commands = {
    help: () => `Available commands (try not to forget them this time):
╭─ Navigation ───────────────────────╮
│ github   Visit GitHub profile      │
│ x        Visit X (Twitter)         │
│ doc      Visit documentation       │
╰────────────────────────────────────╯
╭─ Information ──────────────────────╮
│ about    What is MikasaAI?        │
│ features List available features   │
│ roadmap  View project roadmap      │
│ ca       Display token address     │
╰────────────────────────────────────╯
╭─ System ──────────────────────────╮
│ help     Show this list           │
│ clear    Clear terminal           │
│ status   Check system status      │
│ chat     Talk to MikasaAI        │
╰────────────────────────────────────╯`,
    
    github: () => {
      window.open('https://github.com', '_blank')
      return 'Opening GitHub... Try not to get lost in the code.'
    },
    
    x: () => {
      window.open('https://x.com', '_blank')
      return 'Opening X... Because apparently that\'s what we call it now.'
    },
    
    doc: () => {
      window.open('https://tinobritty.tech', '_blank')
      return 'Opening documentation... Good luck understanding it.'
    },

    about: () => `MikasaAI: Your AI-powered developer assistant for streamlined application building.
Just don't expect me to be as strong as the real Mikasa.`,

    features: () => `✨ Features (because apparently we need these):
╭─ Core Capabilities ─────────────────╮
│ ⚡ Interactive CLI: Simple,         │
│   user-friendly prompts            │
│                                    │
│ 🧠 Dynamic API Understanding:      │
│   Parses openai.json              │
│                                    │
│ 🛠️  Custom Code Generation:        │
│   Tailored application code       │
│                                    │
│ ⚠️  Handles API Limitations:       │
│   Clear constraints               │
│                                    │
│ 📁 Project Output:                │
│   Organized project files         │
╰────────────────────────────────────╯`,

    roadmap: () => `Roadmap (assuming we survive the titans):
╭─ Development Phases ───────────────╮
│ 1️⃣  Phase 1: Token Launch         │
│    Status: In Progress            │
│                                   │
│ 2️⃣  Phase 2: Integration         │
│    Status: Planned               │
│                                   │
│ 3️⃣  Phase 3: Ecosystem Growth    │
│    Status: Future                │
╰───────────────────────────────────╯`,

    ca: () => 'E7Rbz6xX45yGS8jWbkkLQvWiP4pXRsUyyosiYYCXpump',

    clear: () => {
      setHistory([])
      return ''
    },

    status: () => `System Status (as if you really care)
╭─ Core Systems ─────────────────────╮
│ CPU............: ${Math.floor(Math.random() * 30) + 70}%         │
│ Memory.........: ${Math.floor(Math.random() * 20) + 80}%         │
│ Network........: Connected        │
│ AI Core........: Sarcastic        │
│ Security.......: Maximum          │
╰────────────────────────────────────╯
╭─ Battle Statistics ─────────────────╮
│ ${getRandomMetric()}
│ ${getRandomMetric()}
│ ${getRandomMetric()}
╰────────────────────────────────────╯`,

    chat: async (args: string) => {
      if (!args) return "Oh, you want to chat? How about you start with an actual message, genius."
      
      setHistory(prev => prev.map((item, i) => 
        i === prev.length - 1 ? { ...item, loading: true } : item
      ))

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: args }),
        })
        
        if (!response.ok) throw new Error('Failed to fetch response')
        
        const data = await response.json()
        return data.message
      } catch (error) {
        return "Even AIs have bad days. Try again when the titans aren't breathing down our necks."
      } finally {
        setHistory(prev => prev.map((item, i) => 
          i === prev.length - 1 ? { ...item, loading: false } : item
        ))
      }
    }
  }

  const handleCommand = async (command: string) => {
    const trimmedCommand = command.trim()
    if (!trimmedCommand) return

    setCommandHistory(prev => [...prev, trimmedCommand])
    setHistoryIndex(-1)

    const [cmd, ...args] = trimmedCommand.split(' ')
    const handler = commands[cmd as keyof typeof commands]
    
    const newHistoryItem = { command: trimmedCommand, output: '', loading: false }
    setHistory(prev => [...prev, newHistoryItem])
    
    if (handler) {
      const output = await handler(args.join(' '))
      setHistory(prev => prev.map((item, i) => 
        i === prev.length - 1 ? { ...item, output } : item
      ))
    } else {
      setHistory(prev => prev.map((item, i) => 
        i === prev.length - 1 ? { 
          ...item, 
          output: `"${cmd}"? Did a titan eat your brain? Try 'help' if you're really that lost.`
        } : item
      ))
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(currentCommand)
      setCurrentCommand('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setCurrentCommand('')
      }
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  return (
    <Card className="terminal-shadow relative h-[70vh] w-full overflow-hidden rounded-lg border border-red-800/50 bg-black/90 p-4 font-mono text-red-400 backdrop-blur-sm">
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-full w-full opacity-10 bg-[linear-gradient(0deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] animate-scanline" />
      </div>
      <div className="flex items-center gap-2 pb-4">
        <div className="h-3 w-3 rounded-full bg-red-500"></div>
        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
        <div className="h-3 w-3 rounded-full bg-green-500"></div>
        <div className="ml-2 text-xs text-red-400/70">MikasaAI v1.0.1 - Probably doomed</div>
      </div>
      <div ref={terminalRef} className="h-full overflow-auto pb-4 space-y-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-red-800/20">
        <div className="text-red-400 font-bold space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-red-500">MikasaAI</span>
            <span className="text-xs text-red-400/70">Reluctantly operational.</span>
          </div>
          <div className="text-sm text-red-400/70">Type 'help' for commands, or don't. I don't care.</div>
        </div>
        {history.map((item, i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-red-500">$</span>
              <span>{item.command}</span>
            </div>
            <div className="ml-4 whitespace-pre-wrap text-red-300">
              {item.loading ? (
                <div className="flex items-center gap-2 text-red-400/70">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Ugh, fine. Processing your request...
                </div>
              ) : (
                item.output
              )}
            </div>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <span className="text-red-500">$</span>
          <input
            type="text"
            value={currentCommand}
            onChange={(e) => {
              setCurrentCommand(e.target.value)
              setIsTyping(true)
              setTimeout(() => setIsTyping(false), 100)
            }}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none"
            autoFocus
          />
          <span 
            className={`${cursorVisible && !isTyping ? 'opacity-100' : 'opacity-0'} transition-opacity`}
          >
            ▋
          </span>
        </div>
      </div>
    </Card>
  )
}

