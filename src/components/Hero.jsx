import csharpIcon from '../assets/csharp.svg';
import gitIcon from '../assets/git.svg';
import reactIcon from '../assets/react.svg';
import typescriptIcon from '../assets/typescript.svg';
import azureIcon from '../assets/azure.svg';
import pielineIcon from '../assets/pipeline.svg';
import dockerIcon from '../assets/docker.svg';

function Hero() {
  const techStack = [
    { name: ".NET (C#)", icon: <img src={csharpIcon} alt=".NET (C#)" className="w-4 h-4" /> },
    { name: "Azure", icon: <img src={azureIcon} alt="Azure" className="w-4 h-4" /> },
    { name: "React", icon: <img src={reactIcon} alt="React" className="w-4 h-4" /> },
    { name: "TypeScript & JavaScript", icon: <img src={typescriptIcon} alt="TypeScript & JavaScript" className="w-4 h-4" /> },
    { name: "CI/CD pipelines", icon: <img src={pielineIcon} alt="CI/CD pipelines" className="w-4 h-4" /> },
    { name: "Docker", icon: <img src={dockerIcon} alt="Docker" className="w-4 h-4" /> },
    { name: "Git", icon: <img src={gitIcon} alt="Git" className="w-4 h-4" /> },
    { name: "Team Leadership", icon: "🧑‍🤝‍🧑" },
  ];

  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <div className="relative z-10 animate-[fadeIn_1s_ease-in]">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-100 mb-4 font-mono transition-all duration-300">
          Oscar Bennich-Björkman
        </h1>
        <p className="text-xl md:text-2xl font-mono mb-8">
          <span className="text-purple-500">Tech Lead</span>
          <span className="text-gray-400"> | </span>
          <span className="text-green-500">Full Stack Developer</span>
        </p>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
          {techStack.map((tech) => (
            <span
              key={tech.name}
              className="px-3 py-1.5 text-sm font-mono bg-gray-800/50 border border-purple-500/30 text-gray-300 rounded-full hover:border-purple-500/60 hover:text-gray-100 transition-colors flex items-center gap-2"
            >
              <span className="text-base flex items-center">{tech.icon}</span>
              <span>{tech.name}</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

export default Hero;
