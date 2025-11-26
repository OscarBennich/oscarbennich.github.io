import { useEffect, useState, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { BlogPost as PostType } from '../types/post'
import { postsMetadata, loadPost } from '../data/posts'
import { extractHeadings, formatDate, calculateReadingTime } from '../utils/markdown'
import CopyButton from './CopyButton'
import HeadingRenderer from './HeadingRenderer'
import TableOfContents from './TableOfContents'

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
      <p className="text-gray-300 mb-4 leading-relaxed font-mono wrap-break-word">
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
      <li className="text-gray-300 font-mono ml-2 wrap-break-word">
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
            <pre className="text-gray-300 p-4 overflow-x-auto! m-0 max-w-full">
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
        className="text-blue-400 hover:text-blue-300 underline wrap-break-word"
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4 font-mono wrap-break-word">
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
          <aside className="hidden lg:block shrink-0">
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
