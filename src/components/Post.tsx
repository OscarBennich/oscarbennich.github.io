import { useEffect, useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Post as PostType } from '../types/post'
import { postsMetadata, loadPost } from '../data/posts'
import { extractHeadings, formatDate, calculateReadingTime } from '../utils/markdown'
import { markdownComponents } from '../config/markdownComponents'
import TableOfContents from './TableOfContents'
import BackToTopButton from './BackToTopButton'

function Post(): React.ReactElement {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<PostType | null>(null)
  const [loading, setLoading] = useState(true)

  const headings = useMemo(() => {
    if (!post) return []
    return extractHeadings(post.content)
  }, [post])

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
      <div className="max-w-4xl lg:max-w-6xl mx-auto px-4 py-12 w-full box-border">
        {/* Back button and header - full width */}
        <Link
          to="/posts"
          className="text-purple-400 hover:text-purple-300 font-mono mb-8 flex items-center gap-2"
        >
          ← Back to Posts
        </Link>

        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4 font-mono break-words">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 font-mono">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.lastUpdated && (
              <>
                <span className="text-gray-500">•</span>
                <span>Updated: {formatDate(post.lastUpdated)}</span>
              </>
            )}
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
            <div className="prose prose-invert prose-xl max-w-none bg-gray-800 rounded-lg p-6 md:p-8 border border-gray-800 overflow-hidden">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
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

      <BackToTopButton />
    </>
  )
}

export default Post
