import { useState, JSX } from 'react'
import { slugify, getText } from '../utils/markdown'

interface HeadingRendererProps {
  level: number
  children: React.ReactNode
}

function HeadingRenderer({ level, children }: HeadingRendererProps): React.ReactElement {
  const text = getText(children)
  const slug = slugify(text)
  const [showCopied, setShowCopied] = useState(false)
  
  const Tag = `h${level}` as keyof JSX.IntrinsicElements
  
  const styles: Record<number, string> = {
    1: "text-3xl md:text-4xl font-bold text-gray-100 mb-4 font-sans",
    2: "text-2xl md:text-3xl font-bold text-gray-100 mt-12 mb-4 font-sans",
    3: "text-xl md:text-2xl font-bold text-gray-100 mt-10 mb-3 font-sans",
    4: "text-lg md:text-xl font-bold text-gray-100 mt-8 mb-3 font-sans",
    5: "text-base md:text-lg font-bold text-gray-100 mt-8 mb-3 font-sans",
    6: "text-sm md:text-base font-bold text-gray-100 mt-8 mb-3 font-sans"
  }
  const style = styles[level] || "font-bold text-gray-100 font-sans"

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault()
    // Get the route hash without any existing section anchor (remove anything after second #)
    const routeHash = window.location.hash.split('#').slice(0, 2).join('#')
    const url = `${window.location.origin}${window.location.pathname}${routeHash}#${slug}`
    navigator.clipboard.writeText(url)
    setShowCopied(true)
    setTimeout(() => setShowCopied(false), 2000)
    
    // Update the browser URL to include the section anchor
    window.history.pushState(null, '', `${routeHash}#${slug}`)
    document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Tag id={slug} className={`${style} group scroll-mt-20`}>
      <span className="inline">{children}</span>
      <a 
        href={`#${slug}`} 
        onClick={handleCopy}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-purple-400 focus:opacity-100 ml-2 inline-block align-middle"
        title="Copy link to section"
        aria-label="Copy link to section"
      >
        {showCopied ? (
          <span className="text-emerald-400 text-lg">✓</span>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
        )}
      </a>
    </Tag>
  )
}

export default HeadingRenderer
