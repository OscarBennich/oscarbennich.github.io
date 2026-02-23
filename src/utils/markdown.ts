export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

export const getText = (node: React.ReactNode): string => {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return node.toString()
  if (Array.isArray(node)) return node.map(getText).join('')
  if (typeof node === 'object' && node !== null && 'props' in node) return getText((node as React.ReactElement).props.children)
  return ''
}

export type TocItem = {
  text: string
  slug: string
  level: number
}

export const extractHeadings = (content: string): TocItem[] => {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const headings: TocItem[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()

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

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}
