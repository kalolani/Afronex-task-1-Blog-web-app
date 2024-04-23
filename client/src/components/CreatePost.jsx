import { usePosts } from "../contexts/postContext";

function CreatePost() {
  const { isOpen } = usePosts();
  function createPosts(e) {
    e.preventDefault();
  }

  return (
    <button
      onSubmit={createPosts}
      className={`phone:${
        isOpen ? "" : "w-full"
      } bg-green-500 border-green-500 text-white rounded-sm hover:bg-green-400 inline-block px-3 py-2 text-sm px-1 laptop:px-5 bigdesktop:text-3xl bigdesktop:py-4 px-4 text-lg`}
    >
      CREATE POSTS
    </button>
  );
}

export default CreatePost;
