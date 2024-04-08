//import { usePosts } from "../contexts/postContext";
import Results from "./Results";
import SearchPosts from "./SearchPosts";
import Logo from "./Logo";
import { Link } from "react-router-dom";

function Header() {
  //const { onClearPosts } = usePosts();
  return (
    <header className="pt-4 sticky top-0 bg-slate-50 border-b-2 border-b-blue-100">
      <Link to="/">
        <Logo />
      </Link>
      <Results />
      <div>
        <SearchPosts />
        <Link to="/register">
          <button className="bg-green-500 border-green-500 text-white rounded-sm hover:bg-green-400">
            Register
          </button>
        </Link>
        <Link to="/login">
          <button className="bg-green-500 border-green-500 text-white rounded-sm hover:bg-green-400">
            Login
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
