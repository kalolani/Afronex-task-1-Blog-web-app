import { usePosts } from "../contexts/postContext";

function Results() {
  const { posts } = usePosts();
  return (
    <p className="self-center font-mono text-green-400 text-xl">
      🚀 {posts.length} atomic posts found
    </p>
  );
}

export default Results;
