import { BlogPost } from '../types/post'

// Post metadata - content will be loaded from markdown files
export const postsMetadata: BlogPost[] = [
  {
    slug: "azure-function-app-logging-setup-guide",
    title: "Setting up logging in Azure Function Apps",
    date: "2025-11-14",
    tags: ["guide", "azure", "logging", "function-app", "application-insights"],
    excerpt:
      "A guide with best practices and gotchas to keep in mind when configuring logging for Azure Function Apps.",
    content: "", // Will be loaded dynamically
  },
  {
    slug: "windows-terminal-setup-guide",
    title: "Customizing Windows Terminal with Oh My Posh",
    date: "2023-10-01",
    tags: ["guide", "windows-terminal"],
    excerpt:
      "How to set up a custom version of Windows Terminal with Oh My Posh.",
    content: "", // Will be loaded dynamically
  },
];

// Function to load post content from markdown file
export async function loadPost(slug: string): Promise<string> {
  try {
    const response = await fetch(`/posts/${slug}/${slug}.md`)
    if (!response.ok) {
      throw new Error(`Failed to load post: ${slug}`)
    }
    const text = await response.text()
    
    // Remove frontmatter (everything between --- markers)
    const contentWithoutFrontmatter = text.replace(/^---[\s\S]*?---\n/, '')
    
    // Transform relative image paths to absolute paths within the post folder
    // Matches ![alt](filename.ext) where filename doesn't start with http/https or /
    const contentWithFixedImages = contentWithoutFrontmatter.replace(
      /!\[([^\]]*)\]\((?!https?:\/\/)(?!\/)([^)]+)\)/g,
      `![$1](/posts/${slug}/$2)`
    )
    
    return contentWithFixedImages
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
