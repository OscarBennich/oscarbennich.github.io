// Helper to generate slug from text
export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-')   // Replace multiple - with single -
}

// Helper to extract text from React children
export const getText = (node: React.ReactNode): string => {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return node.toString()
  if (Array.isArray(node)) return node.map(getText).join('')
  if (typeof node === 'object' && node !== null && 'props' in node) return getText((node as React.ReactElement).props.children)
  return ''
}

// Type for table of contents item
export type TocItem = {
  text: string
  slug: string
  level: number
}

// Helper to extract headings from markdown content
export const extractHeadings = (content: string): TocItem[] => {
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
