import { useState, useEffect } from 'react'
import { TocItem } from '../utils/markdown'

interface TableOfContentsProps {
  headings: TocItem[]
  isMobile?: boolean
}

function TableOfContents({ headings, isMobile = false }: TableOfContentsProps): React.ReactElement | null {
  const [isOpen, setIsOpen] = useState(false)
  const [, setActiveId] = useState<string>('')

  useEffect(() => {
    // Only enable intersection observer on desktop to avoid performance issues on mobile
    if (isMobile) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -80% 0px', threshold: 0.5 }
    )

    headings.forEach(({ slug }) => {
      const element = document.getElementById(slug)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings, isMobile])

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isMobile && isOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollBarWidth}px`
      
      return () => {
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
      }
    }
  }, [isMobile, isOpen])

  const handleClick = (slug: string) => {
    const routeHash = window.location.hash.split('#').slice(0, 2).join('#')
    window.history.pushState(null, '', `${routeHash}#${slug}`)
    document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  if (headings.length === 0) return null

  if (isMobile) {
    return (
      <>
        {/* Table of contents button - positioned within viewport bounds */}
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-40 p-2.5 md:p-3 bg-purple-600 hover:bg-purple-500 text-white rounded-full shadow-lg transition-colors cursor-pointer opacity-90 hover:opacity-100"
          aria-label="Open table of contents"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-6 md:h-6">
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <circle cx="4" cy="6" r="1.5" fill="currentColor"></circle>
            <circle cx="4" cy="12" r="1.5" fill="currentColor"></circle>
            <circle cx="4" cy="18" r="1.5" fill="currentColor"></circle>
          </svg>
        </button>

        {/* Slide-out menu from left - only render when needed */}
        {isOpen && (
          <nav
            className="fixed inset-0 z-50"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsOpen(false)}
            />
            {/* Menu panel */}
            <div className="absolute top-0 left-0 h-full w-80 max-w-[85vw] bg-gray-900 border-r border-gray-700 overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h2 className="text-lg font-bold text-purple-400 font-mono">In this post</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-800 rounded cursor-pointer transition-colors"
                  aria-label="Close table of contents"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <ul className="space-y-2 font-mono text-sm">
                  {headings.map(({ text, slug, level }) => (
                    <li key={slug} style={{ paddingLeft: `${(level - 2) * 0.75}rem` }}>
                      <a
                        href={`#${slug}`}
                        onClick={(e) => {
                          e.preventDefault()
                          handleClick(slug)
                        }}
                        className="block py-2 text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        {text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
        )}
      </>
    )
  }

  // Desktop sidebar
  return (
    <nav className="w-[250px]">
      <div className="sticky top-20 bg-gray-800 border border-gray-700 rounded-lg p-4">
        <h2 className="text-sm font-bold text-purple-400 mb-3 font-mono">In this post</h2>
        <ul className="space-y-2 font-mono text-xs border-l-2 border-gray-700 overflow-x-hidden pr-2">
          {headings.map(({ text, slug, level }) => (
            <li key={slug} style={{ paddingLeft: `${(level - 2) * 0.75 + 0.75}rem` }}>
              <a
                href={`#${slug}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleClick(slug)
                }}
                className="block py-1 text-white hover:text-purple-400 transition-colors wrap-break-word"
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default TableOfContents
