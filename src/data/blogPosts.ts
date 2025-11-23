import { BlogPost } from '../types/blog'

// Blog post metadata - content will be loaded from markdown files
export const blogPostsMetadata: BlogPost[] = [
  {
    slug: 'building-with-react-and-tailwind',
    title: 'Building a Modern Website with React and Tailwind CSS',
    date: '2024-01-22',
    tags: ['react', 'tailwind', 'web-development'],
    excerpt: 'Exploring the process of building a modern, responsive website using React and Tailwind CSS.',
    content: '' // Will be loaded dynamically
  },
  {
    slug: 'welcome-to-my-blog',
    title: 'Welcome to My Blog',
    date: '2024-01-15',
    tags: ['introduction', 'personal'],
    excerpt: 'This is my first blog post where I introduce myself and share what you can expect from this blog.',
    content: '' // Will be loaded dynamically
  },
  {
    slug: 'azure-function-app-logging-setup-guide',
    title: 'How-to: Set up logging for Azure Function Apps',
    date: '2025-11-14',
    tags: ['azure', 'logging', 'function-app', 'application-insights'],
    excerpt: 'A how-to/guide with best practices and gotchas to keep in mind when configuring logging for Azure Function Apps.',
    content: '' // Will be loaded dynamically
  }
]

// Function to load blog post content from markdown file
export async function loadBlogPost(slug: string): Promise<string> {
  try {
    const response = await fetch(`/blog/${slug}.md`)
    if (!response.ok) {
      throw new Error(`Failed to load blog post: ${slug}`)
    }
    const text = await response.text()
    
    // Remove frontmatter (everything between --- markers)
    const contentWithoutFrontmatter = text.replace(/^---[\s\S]*?---\n/, '')
    
    return contentWithoutFrontmatter
  } catch (error) {
    console.error('Error loading blog post:', error)
    return ''
  }
}

// Function to get all blog posts with content loaded
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const postsWithContent = await Promise.all(
    blogPostsMetadata.map(async (post) => ({
      ...post,
      content: await loadBlogPost(post.slug)
    }))
  )
  return postsWithContent
}
