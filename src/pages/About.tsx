import { useEffect } from 'react'
import csharpIcon from '../assets/csharp.svg'
import dotnetIcon from '../assets/dotnet.svg'
import gitIcon from '../assets/git.svg'
import reactIcon from '../assets/react.svg'
import typescriptIcon from '../assets/typescript.svg'
import javascriptIcon from '../assets/javascript.svg'
import azureIcon from '../assets/azure.svg'
import pielineIcon from '../assets/pipeline.svg'
import dockerIcon from '../assets/docker.svg'
import sparklesIcon from '../assets/sparkles.svg'
import databaseIcon from '../assets/database.svg'
import apiIcon from '../assets/api.svg'
import pdfIcon from '../assets/pdf.svg'
import profilePicture from '../assets/profile_picture_2024_cropped.jpeg'

interface TechItem {
  name: string
  icon: React.ReactNode
}

const techStack: TechItem[][] = [
  [
    { name: "C#", icon: <img src={csharpIcon} alt="C#" className="w-5 h-5" /> },
    { name: "ASP.NET", icon: <img src={dotnetIcon} alt="ASP.NET" className="w-4 h-4" /> },
    { name: "Azure", icon: <img src={azureIcon} alt="Azure" className="w-4 h-4" /> },
    { name: "REST APIs", icon: <img src={apiIcon} alt="REST APIs" className="w-4 h-4" /> },
    { name: "SQL", icon: <img src={databaseIcon} alt="SQL" className="w-4 h-4" /> },
    { name: "CI/CD pipelines", icon: <img src={pielineIcon} alt="CI/CD pipelines" className="w-4 h-4" /> },
  ],
  [
    { name: "React", icon: <img src={reactIcon} alt="React" className="w-4 h-4" /> },
    { name: "TypeScript", icon: <img src={typescriptIcon} alt="TypeScript" className="w-4 h-4" /> },
    { name: "JavaScript", icon: <img src={javascriptIcon} alt="JavaScript" className="w-4 h-4" /> },
  ],
  [
    { name: "Docker", icon: <img src={dockerIcon} alt="Docker" className="w-4 h-4" /> },
    { name: "Git", icon: <img src={gitIcon} alt="Git" className="w-4 h-4" /> },
    { name: "Agentic coding", icon: <img src={sparklesIcon} alt="Agentic coding" className="w-4 h-4" /> },
  ],
]

function TechRow({ items }: { items: TechItem[] }): React.ReactElement {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((tech) => (
        <span
          key={tech.name}
          className="px-3 py-1.5 text-sm font-mono bg-gray-900/50 border border-purple-500/30 text-gray-300 rounded-full hover:border-purple-500/60 hover:text-gray-100 transition-colors flex items-center gap-2"
        >
          <span className="text-base flex items-center">{tech.icon}</span>
          <span>{tech.name}</span>
        </span>
      ))}
    </div>
  )
}

function About(): React.ReactElement {
  useEffect(() => {
    document.title = 'Oscar Bennich-Björkman | About'
  }, [])

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-12">
      <div className="max-w-4xl w-full">
        {/* General Info Section */}
        <div className="mb-12">
          <img
            src={profilePicture}
            alt="Oscar Bennich-Björkman profile picture"
            loading="lazy"
            decoding="async"
            className="w-40 h-40 object-cover border-2 border-purple-500/30 float-left mt-13 mr-6 mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-100 font-mono mb-4">
            &gt; whoami
          </h2>
          <p className="text-gray-300 font-mono text-sm leading-relaxed mb-3">
            Hi! 👋 I'm Oscar Bennich-Björkman. Tech Lead / Full-Stack Developer
            @{" "}
            <a
              href="https://www.viedoc.com/"
              className="text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Viedoc
            </a>{" "}
            in Uppsala, Sweden.
          </p>
          <p className="text-gray-300 font-mono text-sm leading-relaxed mb-3">
            I'm passionate about software development and enjoy continuously
            sharpening my skills and knowledge and sharing it with others. I
            find it deeply satisfying to use those skills to optimize systems
            and processes, and to solve complex problems in simple ways. I often
            learn things best when I try to explain them — which is why I will
            sometimes share my thoughts as posts here. Hopefully you'll learn
            something, too!
          </p>
          <p className="text-gray-300 font-mono text-sm leading-relaxed">
            Outside of work, I enjoy long-distance running, traveling, gaming
            (Dungeons & Dragons, video/computer games, board games), and
            spending time with my wife, friends, family, and my cat.
          </p>
        </div>

        {/* Contact Section */}
        <div className="mb-12 font-mono">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">
            &gt; contact
          </h2>
          <div className="flex flex-col gap-3">
            <a
              href="https://www.linkedin.com/in/oscar-bennich-bjorkman/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-gray-300 hover:text-gray-100 transition-colors text-sm flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <a
              href="https://github.com/oscarbennich"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-gray-300 hover:text-gray-100 transition-colors text-sm flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              GitHub
            </a>
            <a
              href="mailto:oscar.bennich@gmail.com"
              className="w-fit text-gray-300 hover:text-gray-100 transition-colors text-sm flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Email
            </a>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-100 font-mono mb-6">
            &gt; skills
          </h2>
          <div className="space-y-3">
            {techStack.map((row, i) => (
              <TechRow key={i} items={row} />
            ))}
          </div>
        </div>

        {/* CV Section */}
        <div className="font-mono">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">&gt; cv</h2>
          <div className="flex flex-row gap-2 w-fit py-2 pr-4 text-gray-300 hover:text-gray-100">
            <span>
              <img src={pdfIcon} alt="PDF Icon" className="w-6 h-6" />
            </span>
            <a
              href="/CV_OscarBennichBjorkman_2025_en.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              View
            </a>
          </div>
          <div className="flex flex-row gap-2 w-fit py-2 pr-4 text-gray-300 hover:text-gray-100">
            <span>
              <img src={pdfIcon} alt="PDF Icon" className="w-6 h-6" />
            </span>
            <a href="/CV_OscarBennichBjorkman_2025_en.pdf" download>
              Download
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About
