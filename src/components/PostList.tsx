import { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Post } from "../types/post";
import { formatDate, calculateReadingTime } from "../utils/markdown";

interface PostListProps {
  posts: Post[];
}

function PostList({ posts }: PostListProps): React.ReactElement {
  const [inputValue, setInputValue] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get all unique tags from all posts
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((post) => {
      post.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [posts]);

  // Check if user is typing a tag (starts with #)
  const tagMatch = inputValue.match(/#(\w*)$/);
  const isTypingTag = tagMatch !== null;
  const partialTag = tagMatch?.[1] || "";

  // Filter tag suggestions based on partial tag
  const suggestions = useMemo(() => {
    if (!isTypingTag) return [];
    return allTags.filter(
      (tag) =>
        tag.toLowerCase().startsWith(partialTag.toLowerCase()) &&
        !selectedTags.includes(tag)
    );
  }, [allTags, isTypingTag, partialTag, selectedTags]);

  // Reset highlighted index when suggestions change
  useEffect(() => {
    setHighlightedIndex(0);
  }, [suggestions.length, partialTag]);

  // Get search term (everything except the current #tag being typed)
  const searchTerm = inputValue.replace(/#\w*$/, "").trim();

  // Sort posts by date (newest first) and filter
  const filteredPosts = useMemo(() => {
    let filtered = [...posts];

    // Sort by date (newest first)
    filtered.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(term) ||
          post.excerpt.toLowerCase().includes(term) ||
          post.content.toLowerCase().includes(term) ||
          post.tags.some((tag) => tag.toLowerCase().includes(term))
      );
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter((post) =>
        selectedTags.every((tag) => post.tags.includes(tag))
      );
    }

    return filtered;
  }, [posts, searchTerm, selectedTags]);

  const handleSuggestionSelect = (tag: string) => {
    const newValue = inputValue.replace(/#\w*$/, "").trim();
    setInputValue(newValue);
    setSelectedTags([...selectedTags, tag]);
    setShowSuggestions(false);
    setHighlightedIndex(0);
    inputRef.current?.focus();
  };

  const handleTagRemove = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isTypingTag && suggestions.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % suggestions.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        handleSuggestionSelect(suggestions[highlightedIndex]);
      } else if (e.key === "Escape") {
        setShowSuggestions(false);
      }
    }
  };

  const clearFilters = () => {
    setInputValue("");
    setSelectedTags([]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4 font-mono">
        Posts
      </h1>
      <p className="text-gray-400 font-mono mb-8">
        Guides, tips & tricks, and random thoughts.
      </p>

      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        {/* Combined Search Bar with Tag Pills */}
        <div className="relative">
          <div
            className="flex flex-wrap items-center gap-2 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition-colors min-h-[48px]"
            onClick={() => inputRef.current?.focus()}
          >
            {/* Selected tag pills */}
            {selectedTags.map((tag) => (
              <button
                key={tag}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTagRemove(tag);
                }}
                className="inline-flex items-center gap-1 px-2 py-1 bg-purple-600 text-white rounded text-xs font-mono hover:bg-purple-700 cursor-pointer transition-colors"
              >
                #{tag}
                <span className="text-purple-300">✕</span>
              </button>
            ))}

            {/* Search input */}
            <input
              ref={inputRef}
              type="text"
              placeholder={selectedTags.length ? "Search or type #..." : "Search posts or type # for tags..."}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setShowSuggestions(true);
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="flex-1 min-w-[180px] bg-transparent text-gray-100 font-mono text-sm focus:outline-none"
            />
          </div>

          {/* Tag suggestions dropdown */}
          {showSuggestions && isTypingTag && suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
              <div className="p-2 text-xs text-gray-400 font-mono border-b border-gray-700">
                ↑↓ to navigate, Enter to select
              </div>
              {suggestions.map((tag, index) => (
                <button
                  key={tag}
                  onClick={() => handleSuggestionSelect(tag)}
                  className={`w-full px-3 py-2 text-left text-gray-100 font-mono text-sm hover:bg-gray-700 cursor-pointer transition-colors ${
                    index === highlightedIndex ? "bg-purple-600/50" : ""
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}

          {/* Hint when input is focused and empty */}
          {showSuggestions && !isTypingTag && inputValue === "" && selectedTags.length === 0 && (
            <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-3">
              <p className="text-gray-400 font-mono text-xs">
                💡 Type <code className="bg-gray-700 px-1 rounded">#</code> to filter by tag
              </p>
            </div>
          )}
        </div>

        {/* Results count */}
        <p className="text-gray-400 font-mono text-sm">
          {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"}{" "}
          found.
        </p>
      </div>

      {/* Posts List */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 font-mono text-lg">
            No posts found matching your criteria.
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 text-blue-400 hover:text-blue-300 font-mono text-sm"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/posts/${post.slug}`}
              className="block group"
            >
              <article className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-3 font-mono break-words">
                  {post.title}
                </h2>

                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-4 font-mono">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="text-gray-600">•</span>
                  <span>{calculateReadingTime(post.content)} min read</span>
                  {post.tags.length > 0 && (
                    <>
                      <span className="text-gray-600">•</span>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-700 text-white rounded text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <p className="text-gray-300 mb-4 font-mono leading-relaxed break-words">
                  {post.excerpt}
                </p>

                <div className="inline-flex items-center gap-2 text-purple-400 font-mono text-sm transition-colors">
                  Read more
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostList;
