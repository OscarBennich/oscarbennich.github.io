import { useEffect, useState, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { BlogPost as PostType } from '../types/post'
import { postsMetadata, loadPost } from '../data/posts'

// Copy button component for code blocks
function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 5000)
  }

  return copied ? (
    <div className="text-xs font-mono flex items-center gap-1.5 px-3 py-1.5 h-[33px]">
      <span className="text-emerald-400">✓</span>
      <span className="text-gray-300">Copied!</span>
    </div>
  ) : (
    <button
      onClick={handleCopy}
      className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs rounded border border-gray-600 transition-colors cursor-pointer h-[33px]"
      aria-label="Copy code to clipboard"
    >
      Copy
    </button>
  )
}

// Helper to generate slug from text
const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-')   // Replace multiple - with single -
}

// Helper to extract text from React children
const getText = (node: React.ReactNode): string => {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return node.toString()
  if (Array.isArray(node)) return node.map(getText).join('')
  if (typeof node === 'object' && node !== null && 'props' in node) return getText((node as any).props.children)
  return ''
}

// Type for table of contents item
type TocItem = {
  text: string
  slug: string
  level: number
}

// Helper to extract headings from markdown content
const extractHeadings = (content: string): TocItem[] => {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const headings: TocItem[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    // Skip h1 as it's the post title
    if (level > 1) {
      headings.push({
        text,
        slug: slugify(text),
        level
      })
    }
  }

  return headings
}

// Heading component with copy link
const HeadingRenderer = ({ level, children }: { level: number, children: React.ReactNode }) => {
  const text = getText(children)
  const slug = slugify(text)
  const [showCopied, setShowCopied] = useState(false)
  
  const Tag = `h${level}` as keyof JSX.IntrinsicElements
  
  const styles = {
    1: "text-3xl md:text-4xl font-bold text-gray-100 mb-4 font-mono",
    2: "text-2xl md:text-3xl font-bold text-gray-100 mt-8 mb-4 font-mono",
    3: "text-xl md:text-2xl font-bold text-gray-100 mt-6 mb-3 font-mono",
    4: "text-lg md:text-xl font-bold text-gray-100 mt-6 mb-3 font-mono",
    5: "text-base md:text-lg font-bold text-gray-100 mt-6 mb-3 font-mono",
    6: "text-sm md:text-base font-bold text-gray-100 mt-6 mb-3 font-mono"
  }[level] || "font-bold text-gray-100 font-mono"

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
    <Tag id={slug} className={`${styles} group flex items-center gap-2 scroll-mt-20`}>
      {children}
      <a 
        href={`#${slug}`} 
        onClick={handleCopy}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-purple-400 focus:opacity-100"
        title="Copy link to section"
        aria-label="Copy link to section"
      >
        {showCopied ? (
            <span className="text-emerald-400 text-lg">✓</span>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
        )}
      </a>
    </Tag>
  )
}

// Table of Contents component
function TableOfContents({ headings, isMobile = false }: { headings: TocItem[], isMobile?: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeId, setActiveId] = useState<string>('')

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
        {/* Hamburger button - positioned within viewport bounds */}
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-40 p-2.5 md:p-3 bg-purple-600 hover:bg-purple-500 text-white rounded-full shadow-lg transition-colors cursor-pointer opacity-90 hover:opacity-100"
          aria-label="Open table of contents"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-6 md:h-6">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
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
                <h2 className="text-lg font-bold text-gray-100 font-mono">In this post</h2>
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
                className="block py-1 text-white hover:text-purple-400 transition-colors break-words"
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

function Post(): React.ReactElement {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [post, setPost] = useState<PostType | null>(null)
  const [loading, setLoading] = useState(true)
  const [showBackToTop, setShowBackToTop] = useState(false)

  // Extract headings for table of contents
  const headings = useMemo(() => {
    if (!post) return []
    return extractHeadings(post.content)
  }, [post])

  const markdownComponents = useMemo(() => ({
    h1: ({children}: {children?: React.ReactNode}) => <HeadingRenderer level={1}>{children}</HeadingRenderer>,
    h2: ({children}: {children?: React.ReactNode}) => <HeadingRenderer level={2}>{children}</HeadingRenderer>,
    h3: ({children}: {children?: React.ReactNode}) => <HeadingRenderer level={3}>{children}</HeadingRenderer>,
    h4: ({children}: {children?: React.ReactNode}) => <HeadingRenderer level={4}>{children}</HeadingRenderer>,
    h5: ({children}: {children?: React.ReactNode}) => <HeadingRenderer level={5}>{children}</HeadingRenderer>,
    h6: ({children}: {children?: React.ReactNode}) => <HeadingRenderer level={6}>{children}</HeadingRenderer>,
    p: ({children}: {children?: React.ReactNode}) => (
      <p className="text-gray-300 mb-4 leading-relaxed font-mono break-words">
        {children}
      </p>
    ),
    ul: ({children}: {children?: React.ReactNode}) => (
      <ul className="list-disc list-outside ml-6 text-gray-300 mb-4 space-y-2 font-mono">
        {children}
      </ul>
    ),
    ol: ({children}: {children?: React.ReactNode}) => (
      <ol className="list-decimal list-outside ml-6 text-gray-300 mb-4 space-y-2 font-mono">
        {children}
      </ol>
    ),
    li: ({children}: {children?: React.ReactNode}) => (
      <li className="text-gray-300 font-mono ml-2 break-words">
        {children}
      </li>
    ),
    code: ({className, children}: {className?: string, children?: React.ReactNode}) => {
      const match = /language-(\w+)/.exec(className || '')
      const language = match ? match[1] : ''
      const isInline = !className

      return isInline ? (
        <code className="bg-gray-700 px-1.5 py-0.5 rounded text-sm font-mono">
          {children}
        </code>
      ) : (
        <div className="my-4 rounded-lg border border-gray-700 overflow-hidden max-w-full">
          {language && (
            <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400 font-mono border-b border-gray-700 flex items-center justify-between">
              <span>{language}</span>
              <CopyButton code={String(children).replace(/\n$/, '')} />
            </div>
          )}
          <div className="bg-[#1a1a1a]">
            {!language && (
              <div className="flex justify-end px-4 pt-2">
                <CopyButton code={String(children).replace(/\n$/, '')} />
              </div>
            )}
            <pre className="text-gray-300 p-4 !overflow-x-auto m-0 max-w-full">
              <code className="text-sm font-mono whitespace-pre">{String(children).replace(/\n$/, '')}</code>
            </pre>
          </div>
        </div>
      )
    },
    pre: ({children}: {children?: React.ReactNode}) => (
      <>
        {children}
      </>
    ),
    a: ({href, children}: {href?: string, children?: React.ReactNode}) => (
      <a 
        href={href}
        className="text-blue-400 hover:text-blue-300 underline break-words"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    blockquote: ({children}: {children?: React.ReactNode}) => (
      <blockquote className="border-l-4 border-gray-700 pl-4 italic text-gray-400 my-4 font-mono">
        {children}
      </blockquote>
    ),
    img: ({src, alt}: {src?: string, alt?: string}) => {
      const imageSrc = src?.startsWith('images/') ? `/posts/${src}` : src
      return (
        <img 
          src={imageSrc}
          alt={alt || ''}
          className="max-w-full h-auto rounded-lg border border-gray-700 my-4"
        />
      )
    },
  }), [])

  useEffect(() => {
    const postMetadata = postsMetadata.find(p => p.slug === slug)
    
    if (postMetadata && slug) {
      loadPost(slug).then((content) => {
        setPost({ ...postMetadata, content })
        setLoading(false)
        document.title = `Oscar Bennich-Björkman | ${postMetadata.title}`
      })
    } else {
      setPost(null)
      setLoading(false)
      document.title = 'Oscar Bennich-Björkman | Post Not Found'
    }
  }, [slug])

  // Handle scroll to hash after content loads
  useEffect(() => {
    if (!loading && post && window.location.hash) {
      // Extract the section anchor (everything after the second #)
      const hashParts = window.location.hash.split('#')
      const sectionId = hashParts.length > 2 ? hashParts[2] : null
      
      if (sectionId) {
        // Small timeout to ensure DOM is ready
        setTimeout(() => {
          const element = document.getElementById(sectionId)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      }
    }
  }, [loading, post])

  // Handle showing/hiding back to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    // Remove section anchor from URL
    const routeHash = window.location.hash.split('#').slice(0, 2).join('#')
    window.history.pushState(null, '', routeHash)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <p className="text-gray-400 font-mono">Loading post...</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-100 mb-6 font-mono">
          Post Not Found
        </h1>
        <p className="text-gray-300 mb-6 font-mono">
          Sorry, the post you're looking for doesn't exist.
        </p>
        <Link 
          to="/posts"
          className="text-purple-400 hover:text-purple-300 font-mono"
        >
          ← Back to Posts
        </Link>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const calculateReadingTime = (content: string): number => {
    const wordsPerMinute = 200
    const words = content.trim().split(/\s+/).length
    return Math.ceil(words / wordsPerMinute)
  }

  return (
    <>
      <div className="max-w-4xl lg:max-w-7xl mx-auto px-4 py-12 w-full box-border">
        {/* Back button and header - full width */}
        <button
          onClick={() => navigate('/posts')}
          className="text-purple-400 hover:text-purple-300 font-mono mb-8 flex items-center gap-2 cursor-pointer"
        >
          ← Back to Posts
        </button>

        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4 font-mono break-words">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 font-mono">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="text-gray-500">•</span>
            <span>{calculateReadingTime(post.content)} min read</span>
            <span className="text-gray-500">•</span>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-2 py-1 text-white bg-gray-700 rounded text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Content and ToC grid - only apply grid on lg screens */}
        <div className="lg:grid lg:grid-cols-[1fr_250px] lg:gap-8 lg:items-start">
          {/* Main content */}
          <article className="min-w-0 max-w-full overflow-hidden">
            <div className="prose prose-invert prose-lg max-w-none bg-gray-800 backdrop-blur-sm rounded-lg p-6 md:p-8 border border-gray-800 overflow-hidden">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </article>

          {/* Desktop ToC sidebar - explicitly hidden on mobile */}
          <aside className="hidden lg:block flex-shrink-0">
            <TableOfContents headings={headings} isMobile={false} />
          </aside>
        </div>
      </div>

      {/* Mobile ToC - only render on non-lg screens */}
      <div className="lg:hidden">
        <TableOfContents headings={headings} isMobile={true} />
      </div>

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-purple-600 hover:bg-purple-500 text-white p-2.5 md:p-3 rounded-full shadow-lg transition-all cursor-pointer z-50 opacity-90 hover:opacity-100"
          aria-label="Back to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-6 md:h-6">
            <path d="M12 19V5M5 12l7-7 7 7"/>
          </svg>
        </button>
      )}
    </>
  )
}

export default Post
