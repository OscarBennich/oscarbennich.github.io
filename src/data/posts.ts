import { PostMetadata, Post } from '../types/post'

export const postsMetadata: PostMetadata[] = [
  {
    slug: "azure-function-app-logging-setup-guide",
    title: "Setting up logging in Azure Function Apps",
    date: "2025-11-14",
    tags: [
      "guide",
      "azure",
      "logging",
      "function-app",
      "application-insights",
      "dotnet",
    ],
    excerpt:
      "A guide with best practices and gotchas to keep in mind when configuring logging for Azure Function Apps.",
  },
  {
    slug: "windows-terminal-setup-guide",
    title: "Customizing Windows Terminal with Oh My Posh",
    date: "2023-10-01",
    lastUpdated: "2025-11-24",
    tags: ["guide", "windows-terminal"],
    excerpt:
      "How to set up a custom version of Windows Terminal with Oh My Posh.",
  },
  {
    slug: "git-tips-and-tricks",
    title: "Git Tips & Tricks",
    date: "2024-03-19",
    lastUpdated: "2025-11-24",
    tags: ["tips & tricks", "git"],
    excerpt: "A collection of useful tips and tricks for using Git.",
  },
  {
    slug: "docker-tips-and-tricks",
    title: "Docker Tips & Tricks",
    date: "2025-01-14",
    tags: ["tips & tricks", "docker"],
    excerpt: "A collection of useful tips and tricks for using Docker.",
  },
  {
    slug: "nuget-tips-and-tricks",
    title: "NuGet Tips & Tricks",
    date: "2024-11-05",
    tags: ["tips & tricks", "nuget", "dotnet"],
    excerpt: "A collection of useful tips and tricks for using NuGet.",
  },
  {
    slug: "lessons-learned-az-pipelines-coverage-dotnet-sq",
    title: "Lessons learned - Azure Pipelines, Code Coverage, .NET, SonarQube",
    date: "2023-12-18",
    tags: ["dotnet", "azure-devops", "sonarqube", "code-coverage", "pipelines"],
    excerpt: "Lessons learned from setting up code coverage reporting with Azure Pipelines, .NET, and SonarQube.",
  }
];

export async function loadPost(slug: string): Promise<string> {
  try {
    const response = await fetch(`/posts/${slug}/${slug}.md`)
    if (!response.ok) {
      throw new Error(`Failed to load post: ${slug}`)
    }
    const text = await response.text()

    const contentWithoutFrontmatter = text.replace(/^---[\s\S]*?---\n/, '')

    // Transform relative image paths to absolute paths within the post folder
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

export async function getAllPosts(): Promise<Post[]> {
  const postsWithContent = await Promise.all(
    postsMetadata.map(async (post) => ({
      ...post,
      content: await loadPost(post.slug)
    }))
  )
  return postsWithContent
}
