export interface BlogPostMetadata {
  title: string
  date: string
  tags: string[]
  excerpt: string
  slug: string
}

export interface BlogPost extends BlogPostMetadata {
  content: string
}
