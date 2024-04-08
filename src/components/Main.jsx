import Posts from "./Posts";
import { Link } from "react-router-dom";

function Main() {
  return (
    <main>
      <Link
        className="bg-green-500 border-green-500 text-white rounded-sm hover:bg-green-400 inline-block px-5 py-4 mb-8"
        to="/form"
      >
        <p>CREATE POSTS</p>
      </Link>
      <Posts />
    </main>
  );
}

export default Main;
