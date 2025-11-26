export interface PostMetadata {
  title: string
  date: string
  lastUpdated?: string
  tags: string[]
  excerpt: string
  slug: string
}

export interface Post extends PostMetadata {
  content: string
}
