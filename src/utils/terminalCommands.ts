import { postsMetadata } from '../data/posts'

export interface CommandResult {
  output: TerminalLine[]
  specialEffect?: 'matrix' | 'party' | 'glitch' | 'exit'
}

export interface TerminalLine {
  text: string
  className?: string
  isLink?: boolean
  href?: string
  newTab?: boolean
}

const COMMANDS: Record<string, string> = {
  about: 'About me',
  skills: 'View my tech stack',
  posts: 'List recent blog posts',
  contact: 'Get in touch',
  cv: 'View or download my CV',
  clear: 'Clear the terminal',
  date: 'Show current date and time',
  history: 'Show command history',
  cowsay: '???',
  matrix: '???',
  party: '???',
  exit: 'Exit the terminal',
}

function line(text: string, className?: string): TerminalLine {
  return { text, className }
}

function link(text: string, href: string, className?: string): TerminalLine {
  return { text, className, isLink: true, href }
}

export function executeCommand(
  input: string,
  commandHistory: string[]
): CommandResult {
  const trimmed = input.trim().toLowerCase()

  if (trimmed === 'help') {
    return {
      output: [
        line('Available commands:', 'text-green-400'),
        line(''),
        ...Object.entries(COMMANDS).map(([cmd, desc]) =>
          line(`  ${cmd.padEnd(12)} ${desc}`, 'text-gray-400')
        ),
        line(''),
        line('Try typing a command and pressing Enter.', 'text-gray-500'),
      ],
    }
  }

  if (trimmed === 'about') {
    return {
      output: [
        line("Hi! 👋 I'm Oscar Bennich-Björkman, a software developer living in"),
        line("Uppsala, Sweden. I'm currently working as a Tech Lead at Viedoc."),
        line(''),
        line(
          "I'm passionate about software development and enjoy continuously"
        ),
        line(
          'sharpening my skills and knowledge and to share it with others. I'
        ),
        line(
          "think it's deeply satisfying to use those skills to optimize systems"
        ),
        line(
          'and processes, and to solve complex problems in a simple way.'
        ),
        line(''),
        line(
          'Outside of work, I enjoy long-distance running, traveling, gaming'
        ),
        line(
          '(D&D, video games, board games), and spending time with my wife,'
        ),
        line('friends, family, and my cat.'),
      ],
    }
  }

  if (trimmed === 'skills') {
    return {
      output: [
        line('Tech Stack:', 'text-green-400'),
        line(''),
        line('  Backend      C#, ASP.NET, REST APIs, SQL', 'text-gray-300'),
        line('  Frontend     React, TypeScript, JavaScript', 'text-gray-300'),
        line('  Cloud        Azure', 'text-gray-300'),
        line('  DevOps       CI/CD pipelines, Docker, Git', 'text-gray-300'),
        line('  AI/Agents    GitHub Copilot, Claude Code', 'text-gray-300'),
      ],
    }
  }

  if (trimmed === 'posts') {
    const sorted = [...postsMetadata].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    return {
      output: [
        line('Recent posts:', 'text-green-400'),
        line(''),
        ...sorted.map((post) =>
          link(
            `  ${post.date}  ${post.title}`,
            `/#/posts/${post.slug}`,
            'text-blue-400 hover:underline'
          )
        ),
      ],
    }
  }

  if (trimmed === 'contact') {
    return {
      output: [
        line('Get in touch:', 'text-green-400'),
        line(''),
        link('  GitHub     github.com/oscarbennich', 'https://github.com/oscarbennich', 'text-blue-400 hover:underline'),
        link('  LinkedIn   linkedin.com/in/oscar-bennich-bjorkman', 'https://www.linkedin.com/in/oscar-bennich-bjorkman/', 'text-blue-400 hover:underline'),
      ],
    }
  }

  if (trimmed === 'cv') {
    return {
      output: [
        line('CV:', 'text-green-400'),
        line(''),
        link('  📄 View CV', '/CV_OscarBennichBjorkman_2025_en.pdf', 'text-blue-400 hover:underline'),
      ],
    }
  }

  if (trimmed === 'date') {
    return {
      output: [line(new Date().toString())],
    }
  }

  if (trimmed === 'history') {
    if (commandHistory.length === 0) {
      return { output: [line('No commands in history.', 'text-gray-500')] }
    }
    return {
      output: commandHistory.map((cmd, i) =>
        line(`  ${String(i + 1).padStart(3)}  ${cmd}`, 'text-gray-400')
      ),
    }
  }

  if (trimmed === 'sudo rm -rf /' || trimmed === 'sudo rm -rf / --no-preserve-root') {
    return {
      output: [
        line('Permission denied: you are not root.', 'text-red-400'),
      ],
      specialEffect: 'glitch',
    }
  }

  if (trimmed === 'matrix') {
    return {
      output: [line('Entering the Matrix...', 'text-green-400')],
      specialEffect: 'matrix',
    }
  }

  if (trimmed === 'party') {
    return {
      output: [line('🎉 Party mode activated!', 'text-yellow-400')],
      specialEffect: 'party',
    }
  }

  if (trimmed === 'cowsay' || trimmed.startsWith('cowsay ')) {
    const message = trimmed.replace('cowsay', '').trim() || 'moo'
    const top = ' ' + '_'.repeat(message.length + 2)
    const mid = `< ${message} >`
    const bot = ' ' + '-'.repeat(message.length + 2)
    return {
      output: [
        line(top),
        line(mid),
        line(bot),
        line('        \\   ^__^'),
        line('         \\  (oo)\\_______'),
        line('            (__)\\       )\\/\\'),
        line('                ||----w |'),
        line('                ||     ||'),
      ],
    }
  }

  if (trimmed === 'exit') {
    return {
      output: [line('Closing terminal...', 'text-gray-500')],
      specialEffect: 'exit',
    }
  }

  if (trimmed === 'clear') {
    return { output: [] }
  }

  if (trimmed === '') {
    return { output: [] }
  }

  return {
    output: [
      line(`command not found: ${input.trim()}`, 'text-red-400'),
      line('Type "help" to see available commands.', 'text-gray-500'),
    ],
  }
}
