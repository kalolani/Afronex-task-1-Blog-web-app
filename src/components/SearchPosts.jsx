import { usePosts } from "../contexts/postContext";

function SearchPosts() {
  const { searchQuery, setSearchQuery } = usePosts();
  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search posts..."
      className="border-lime-400 focus:outline-none placeholder:text-stone-500 italic"
    />
  );
}

export default SearchPosts;
