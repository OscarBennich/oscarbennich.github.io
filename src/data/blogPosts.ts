import { BlogPost } from '../types/blog'

export const blogPosts: BlogPost[] = [
  {
    slug: 'building-with-react-and-tailwind',
    title: 'Building a Modern Website with React and Tailwind CSS',
    date: '2024-01-22',
    tags: ['react', 'tailwind', 'web-development'],
    excerpt: 'Exploring the process of building a modern, responsive website using React and Tailwind CSS.',
    content: `# Building a Modern Website with React and Tailwind CSS

In this post, I'll share my experience building this very website using React and Tailwind CSS.

## Why React?

React has become the go-to library for building modern web applications. Its component-based architecture makes it easy to:

- Break down complex UIs into manageable pieces
- Reuse code across different parts of the application
- Maintain state efficiently
- Create responsive, interactive experiences

## The Power of Tailwind CSS

Tailwind CSS is a utility-first CSS framework that has transformed how I approach styling. Instead of writing custom CSS for every component, you compose styles using utility classes directly in your markup.

### Benefits I've Discovered

1. **Rapid Development**: No need to switch between files or think about class names
2. **Consistency**: Built-in design system ensures visual consistency
3. **Responsive Design**: Mobile-first utilities make responsiveness straightforward
4. **Dark Mode**: First-class support for dark mode styling

## Putting It All Together

The combination of React and Tailwind creates a powerful development experience. React handles the component logic and state management, while Tailwind makes it easy to create beautiful, responsive designs.

\`\`\`typescript
// Example: A simple component with Tailwind
function Hero() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-4xl font-bold text-white">
        Hello, World!
      </h1>
    </div>
  )
}
\`\`\`

## Conclusion

If you're building a new web project, I highly recommend giving React and Tailwind CSS a try. The developer experience is excellent, and the results speak for themselves.
`
  },
  {
    slug: 'welcome-to-my-blog',
    title: 'Welcome to My Blog',
    date: '2024-01-15',
    tags: ['introduction', 'personal'],
    excerpt: 'This is my first blog post where I introduce myself and share what you can expect from this blog.',
    content: `# Welcome to My Blog

Hello and welcome! This is my first blog post, and I'm excited to share my thoughts and experiences with you.

## About Me

I'm a software engineer passionate about building great products and learning new technologies. This blog will be a place where I share:

- Technical insights and tutorials
- Project experiences and lessons learned
- Thoughts on software engineering practices
- Interesting problems I've solved

## What to Expect

I plan to write regularly about topics that interest me in the world of software development. Whether you're a fellow developer or just curious about tech, I hope you'll find something valuable here.

## Stay Connected

Feel free to reach out if you have questions or just want to chat about technology. I'm always happy to connect with fellow developers!

Thanks for stopping by, and I look forward to sharing more with you soon.
`
  }
]
