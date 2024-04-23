/* eslint-disable no-unused-vars */
import { usePosts } from "../contexts/postContext";
import { Link } from "react-router-dom";
import styles from "./List.module.css";
import { format } from "date-fns";

function List() {
  const { posts, postInfo } = usePosts();

  return (
    <ul className="list-none grid grid-cols-4 phone:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 bigdesktop:grid-cols-4 gap-x-8 gap-y-8">
      {posts.length > 0 &&
        posts.map((post, i) => (
          <>
            <li
              className="py-4 px-4 border border-green-500 phone:px-2 w-9/12 p-tab:w-7/12  tablet:w-11/12 phone:self-center phone:justify-self-center laptop:px-4"
              key={post._id}
            >
              <Link to={`/post/${post._id}`} className={styles.link}>
                <h3 className="text-inherit font-medium bigdesktop:text-2xl">
                  {" "}
                  {post.title}
                </h3>
                <p className="text-inherit mb-2 bigdesktop:text-2xl">
                  {" "}
                  Author :{post.author.email}
                </p>

                <p className="text-inherit mb-2 bigdesktop:text-2xl">
                  {" "}
                  expertise: {post.expertise}
                </p>
                <p className="text-inherit mb-2 font-sans bigdesktop:text-2xl">
                  {" "}
                  date: {format(new Date(post.createdAt), "MMM d, yyyy HH:mm")}
                </p>
              </Link>
            </li>
          </>
        ))}
    </ul>
  );
}

export default List;
