import CodeBlock from '../components/CodeBlock'
import HeadingRenderer from '../components/HeadingRenderer'

type ChildrenProps = {
  children?: React.ReactNode
}

type CodeProps = {
  className?: string
  children?: React.ReactNode
}

type LinkProps = {
  href?: string
  children?: React.ReactNode
}

type ImageProps = {
  src?: string
  alt?: string
}

type DetailsProps = {
  children?: React.ReactNode
  open?: boolean
}

type SummaryProps = {
  children?: React.ReactNode
}

// Markdown component renderers for ReactMarkdown
export const markdownComponents = {
  h1: ({ children }: ChildrenProps) => <HeadingRenderer level={1}>{children}</HeadingRenderer>,
  h2: ({ children }: ChildrenProps) => <HeadingRenderer level={2}>{children}</HeadingRenderer>,
  h3: ({ children }: ChildrenProps) => <HeadingRenderer level={3}>{children}</HeadingRenderer>,
  h4: ({ children }: ChildrenProps) => <HeadingRenderer level={4}>{children}</HeadingRenderer>,
  h5: ({ children }: ChildrenProps) => <HeadingRenderer level={5}>{children}</HeadingRenderer>,
  h6: ({ children }: ChildrenProps) => <HeadingRenderer level={6}>{children}</HeadingRenderer>,
  
  p: ({ children }: ChildrenProps) => (
    <p className="text-gray-300 mb-4 leading-relaxed font-sans break-words">
      {children}
    </p>
  ),
  
  ul: ({ children }: ChildrenProps) => (
    <ul className="list-disc list-outside ml-6 text-gray-300 mb-4 space-y-2 font-sans">
      {children}
    </ul>
  ),
  
  ol: ({ children }: ChildrenProps) => (
    <ol className="list-decimal list-outside ml-6 text-gray-300 mb-4 space-y-2 font-sans">
      {children}
    </ol>
  ),
  
  li: ({ children }: ChildrenProps) => (
    <li className="text-gray-300 font-sans ml-2 break-words">
      {children}
    </li>
  ),
  
  code: ({ className, children }: CodeProps) => {
    const match = /language-(\w+)/.exec(className || '')
    const language = match ? match[1] : ''
    const isInline = !className

    if (isInline) {
      return (
        <code className="bg-gray-700 px-1.5 py-0.5 rounded text-sm font-mono">
          {children}
        </code>
      )
    }

    return (
      <CodeBlock language={language}>
        {String(children).replace(/\n$/, '')}
      </CodeBlock>
    )
  },
  
  pre: ({ children }: ChildrenProps) => <>{children}</>,
  
  a: ({ href, children }: LinkProps) => (
    <a 
      href={href}
      className="text-blue-400 hover:text-blue-300 underline break-words"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  
  blockquote: ({ children }: ChildrenProps) => (
    <blockquote className="border-l-4 border-gray-700 pl-4 italic text-gray-400 my-4 font-sans">
      {children}
    </blockquote>
  ),
  
  img: ({ src, alt }: ImageProps) => (
    <img 
      src={src}
      alt={alt || ''}
      loading="lazy"
      decoding="async"
      className="max-w-full h-auto rounded-lg border border-gray-700 my-4 contain-paint"
      style={{ contentVisibility: 'auto' }}
    />
  ),

  details: ({ children, open }: DetailsProps) => (
    <details 
      open={open}
      className="my-4 border border-gray-700 rounded-lg bg-gray-800/50 overflow-hidden [&>*:not(summary)]:mx-4 [&>*:not(summary)]:mb-4 [&>*:last-child]:mb-4"
    >
      {children}
    </details>
  ),

  summary: ({ children }: SummaryProps) => (
    <summary className="cursor-pointer px-4 py-3 font-mono text-gray-200 hover:bg-gray-700/50 select-none list-none flex items-center gap-3 marker:hidden [&::-webkit-details-marker]:hidden">
      <span className="text-gray-400 transition-transform details-open:rotate-90">▶</span>
      <span>{children}</span>
    </summary>
  ),
}
