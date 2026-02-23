import { useState, useEffect, useRef, memo } from 'react'
import CopyButton from './CopyButton'

type CodeBlockProps = {
  language: string
  children: string
}

// Lazy-loaded syntax highlighter component
const CodeBlock = memo(function CodeBlock({ language, children }: CodeBlockProps) {
  const [highlighted, setHighlighted] = useState<React.ReactNode>(null)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const code = children.replace(/\n$/, '')

  // Use IntersectionObserver to detect when code block is visible
  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '100px' } // Start loading slightly before visible
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  // Lazy load syntax highlighting only when visible
  useEffect(() => {
    if (!isVisible || !language) return

    let cancelled = false

    const loadHighlighter = async () => {
      try {
        const { default: SyntaxHighlighter } = await import('react-syntax-highlighter/dist/esm/prism-light')

        const languageImports: Record<string, () => Promise<{ default: unknown }>> = {
          javascript: () => import('react-syntax-highlighter/dist/esm/languages/prism/javascript'),
          js: () => import('react-syntax-highlighter/dist/esm/languages/prism/javascript'),
          typescript: () => import('react-syntax-highlighter/dist/esm/languages/prism/typescript'),
          ts: () => import('react-syntax-highlighter/dist/esm/languages/prism/typescript'),
          tsx: () => import('react-syntax-highlighter/dist/esm/languages/prism/tsx'),
          jsx: () => import('react-syntax-highlighter/dist/esm/languages/prism/jsx'),
          json: () => import('react-syntax-highlighter/dist/esm/languages/prism/json'),
          yaml: () => import('react-syntax-highlighter/dist/esm/languages/prism/yaml'),
          yml: () => import('react-syntax-highlighter/dist/esm/languages/prism/yaml'),
          bash: () => import('react-syntax-highlighter/dist/esm/languages/prism/bash'),
          shell: () => import('react-syntax-highlighter/dist/esm/languages/prism/bash'),
          sh: () => import('react-syntax-highlighter/dist/esm/languages/prism/bash'),
          css: () => import('react-syntax-highlighter/dist/esm/languages/prism/css'),
          html: () => import('react-syntax-highlighter/dist/esm/languages/prism/markup'),
          xml: () => import('react-syntax-highlighter/dist/esm/languages/prism/markup'),
          markdown: () => import('react-syntax-highlighter/dist/esm/languages/prism/markdown'),
          md: () => import('react-syntax-highlighter/dist/esm/languages/prism/markdown'),
          csharp: () => import('react-syntax-highlighter/dist/esm/languages/prism/csharp'),
          cs: () => import('react-syntax-highlighter/dist/esm/languages/prism/csharp'),
          python: () => import('react-syntax-highlighter/dist/esm/languages/prism/python'),
          py: () => import('react-syntax-highlighter/dist/esm/languages/prism/python'),
          sql: () => import('react-syntax-highlighter/dist/esm/languages/prism/sql'),
          powershell: () => import('react-syntax-highlighter/dist/esm/languages/prism/powershell'),
          ps: () => import('react-syntax-highlighter/dist/esm/languages/prism/powershell'),
          ps1: () => import('react-syntax-highlighter/dist/esm/languages/prism/powershell'),
          kql: () => import('react-syntax-highlighter/dist/esm/languages/prism/kusto'),
          kusto: () => import('react-syntax-highlighter/dist/esm/languages/prism/kusto'),
        }

        const langKey = language.toLowerCase()
        const importLang = languageImports[langKey]
        if (!importLang) return

        const langModule = await importLang()
        if (cancelled) return

        SyntaxHighlighter.registerLanguage(langKey, langModule.default)

        const styleModule = await import('react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus')
        if (cancelled) return

        setHighlighted(
          <SyntaxHighlighter
            language={langKey}
            style={styleModule.default}
            customStyle={{
              margin: 0,
              padding: '1rem',
              background: '#1a1a1a',
              fontSize: '0.875rem',
            }}
            codeTagProps={{
              style: {
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
              }
            }}
          >
            {code}
          </SyntaxHighlighter>
        )
      } catch {
        if (!cancelled) {
          setHighlighted(null)
        }
      }
    }

    loadHighlighter()

    return () => { cancelled = true }
  }, [isVisible, language, code])

  return (
    <div ref={ref} className="my-6 rounded-lg border border-gray-600 overflow-hidden max-w-full shadow-lg shadow-black/20">
      {language && (
        <div className="bg-gray-700 px-4 py-2 text-xs text-gray-300 font-mono border-b border-gray-600 flex items-center justify-between">
          <span>{language}</span>
          <CopyButton code={code} />
        </div>
      )}
      <div className="bg-[#1a1a1a]">
        {!language && (
          <div className="flex justify-end px-4 pt-2">
            <CopyButton code={code} />
          </div>
        )}
        {highlighted || (
          <pre className="text-gray-300 p-4 overflow-x-auto m-0 max-w-full">
            <code className="text-sm font-mono whitespace-pre">{code}</code>
          </pre>
        )}
      </div>
    </div>
  )
})

export default CodeBlock
