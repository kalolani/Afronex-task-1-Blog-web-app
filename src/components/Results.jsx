import { usePosts } from "../contexts/postContext";

function Results() {
  const { posts, isOpen } = usePosts();
  return (
    <div
      className={` flex phone:gap-2 font-mono text-green-400 text-xl phone:text-sm phone:${
        isOpen
          ? "opacity-0 invisible h-0 gap-16 "
          : "opacity-100 visible h-full"
      } tablet:flex-row  laptop:text-xl bigdesktop:text-4xl`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        className="w-6 h-6 stroke-green-700 tablet:w-4 h-4 laptop:w-8 h-8 bigdesktop:w-12 h-12"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
        />
      </svg>

      <p>{posts.length} Blogs found</p>
    </div>
  );
}

export default Results;
