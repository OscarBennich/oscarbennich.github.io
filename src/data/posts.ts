import { BlogPost } from '../types/post'

// Post metadata - content will be loaded from markdown files
export const postsMetadata: BlogPost[] = [
  {
    slug: 'azure-function-app-logging-setup-guide',
    title: 'How-to: Set up logging for Azure Function Apps',
    date: '2025-11-14',
    tags: ['azure', 'logging', 'function-app', 'application-insights'],
    excerpt: 'A how-to/guide with best practices and gotchas to keep in mind when configuring logging for Azure Function Apps.',
    content: '' // Will be loaded dynamically
  }
]

// Function to load post content from markdown file
export async function loadPost(slug: string): Promise<string> {
  try {
    const response = await fetch(`/posts/${slug}.md`)
    if (!response.ok) {
      throw new Error(`Failed to load post: ${slug}`)
    }
    const text = await response.text()
    
    // Remove frontmatter (everything between --- markers)
    const contentWithoutFrontmatter = text.replace(/^---[\s\S]*?---\n/, '')
    
    return contentWithoutFrontmatter
  } catch (error) {
    console.error('Error loading post:', error)
    return ''
  }
}

// Function to get all posts with content loaded
export async function getAllPosts(): Promise<BlogPost[]> {
  const postsWithContent = await Promise.all(
    postsMetadata.map(async (post) => ({
      ...post,
      content: await loadPost(post.slug)
    }))
  )
  return postsWithContent
}
