export interface PostMetadata {
  title: string
  date: string
  tags: string[]
  excerpt: string
  slug: string
}

export interface Post extends PostMetadata {
  content: string
}
