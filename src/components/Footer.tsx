function Footer(): React.ReactElement {
  return (
    <footer className="relative z-10 bg-gray-800 border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <p className="text-center text-gray-400 font-mono text-sm">
          Curious how I built this site?{' '}
          <a
            href="https://github.com/OscarBennich/oscarbennich.github.io/blob/main/README.md"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Read more here
          </a>.
        </p>
      </div>
    </footer>
  )
}

export default Footer
