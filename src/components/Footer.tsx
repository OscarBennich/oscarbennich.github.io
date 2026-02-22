function Footer(): React.ReactElement {
  return (
    <footer className="relative z-10 bg-gray-800 border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <p className="text-center text-gray-400 font-mono text-sm">
          Wondering how this site was built?
        </p>
        <p className="text-center text-gray-400 font-mono text-sm">
          Check out the {" "}
          <a
            href="https://github.com/OscarBennich/oscarbennich.github.io/blob/main/README.md"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            README
          </a>
          .
        </p>
      </div>
    </footer>
  );
}

export default Footer
