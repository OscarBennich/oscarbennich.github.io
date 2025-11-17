import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { BlogPost } from '../types/blog'

interface BlogListProps {
  posts: BlogPost[]
}

function BlogList({ posts }: BlogListProps): React.ReactElement {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

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

  // Get all unique tags from all posts
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    posts.forEach(post => {
      post.tags.forEach(tag => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  }, [posts])

  // Sort posts by date (newest first) and filter
  const filteredPosts = useMemo(() => {
    let filtered = [...posts]

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term) ||
        post.content.toLowerCase().includes(term) ||
        post.tags.some(tag => tag.toLowerCase().includes(term))
      )
    }

    // Filter by selected tag
    if (selectedTag) {
      filtered = filtered.filter(post => post.tags.includes(selectedTag))
    }

    return filtered
  }, [posts, searchTerm, selectedTag])

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedTag(null)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4 font-mono">
        Blog Posts
      </h1>
      <p className="text-gray-400 font-mono mb-8">
        Thoughts, tutorials, and experiences in software engineering
      </p>

      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 font-mono text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
            >
              ✕
            </button>
          )}
        </div>

        {/* Tag Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-gray-400 font-mono text-sm">Filter by tag:</span>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-3 py-1.5 rounded-lg text-sm font-mono transition-all ${
                selectedTag === tag
                  ? 'bg-purple-600 text-white border border-purple-500'
                  : 'bg-gray-800 text-gray-300 border border-gray-700 hover:border-purple-500'
              }`}
            >
              #{tag}
            </button>
          ))}
          {(searchTerm || selectedTag) && (
            <button
              onClick={clearFilters}
              className="px-3 py-1.5 bg-gray-700 text-gray-300 rounded-lg text-sm font-mono hover:bg-gray-600 transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Results count */}
        <p className="text-gray-400 font-mono text-sm">
          {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} found
        </p>
      </div>
      
      {/* Posts List */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 font-mono text-lg">No posts found matching your criteria.</p>
          <button
            onClick={clearFilters}
            className="mt-4 text-blue-400 hover:text-blue-300 font-mono text-sm"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredPosts.map((post) => (
            <Link 
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="block group"
            >
              <article 
                className="border border-gray-700 rounded-lg p-6 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-3 font-mono group-hover:text-purple-400 transition-colors">
                  {post.title}
                </h2>
                
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-4 font-mono">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="text-gray-600">•</span>
                  <span>{calculateReadingTime(post.content)} min read</span>
                  {post.tags.length > 0 && (
                    <>
                      <span className="text-gray-600">•</span>
                      <div className="flex gap-2">
                        {post.tags.map((tag) => (
                          <button
                            key={tag}
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              handleTagClick(tag)
                            }}
                            className={`px-2 py-1 rounded text-xs transition-colors cursor-pointer ${
                              selectedTag === tag
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                
                <p className="text-gray-300 mb-4 font-mono leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="inline-flex items-center gap-2 text-purple-400 group-hover:text-green-400 font-mono text-sm transition-colors">
                  Read more 
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default BlogList
