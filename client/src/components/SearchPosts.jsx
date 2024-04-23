import { usePosts } from "../contexts/postContext";

function SearchPosts() {
  const { searchQuery, setSearchQuery } = usePosts();
  // const { isOpen } = usePosts();
  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search by author..."
      className={`rounded-sm focus:outline-green-500 text-black w-2/3  tablet:w-1/3 bigdesktop:py-4
      } `}
    />
  );
}

export default SearchPosts;
