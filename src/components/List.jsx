import { usePosts } from "../contexts/postContext";
import { Link } from "react-router-dom";
import styles from "./List.module.css";

function List() {
  const { posts } = usePosts();

  return (
    <ul>
      {posts.map((post, i) => (
        <li className="hover:bg-green-50 border-green-500" key={i}>
          <Link to={`/body/${i}`} className={styles.link}>
            <h3 className="text-inherit font-medium"> {post.title}</h3>
            <p className="text-inherit mb-2"> Author: {post.author}</p>
            <p className="text-inherit mb-2"> expertise: {post.expertise}</p>
            <p className="text-inherit mb-2"> date: {post.date}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default List;
