/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

const PostContext = createContext();

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

const BASE_URL = "http://localhost:9000";
function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [emailInfo, setEmailInfo] = useState({});

  useEffect(function () {
    async function fetchPosts() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/posts`);
        const data = await res.json();

        setPosts(data);
      } catch {
        throw new Error("cant't load the posts");
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, []);

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  async function handleAddPost(post) {
    console.log(post);
    try {
      setIsLoading(true);
      // Add the new object to the beginning of the array
      const res = await fetch(`http://localhost:4000/post`, {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      setPosts((posts) => [data, ...posts]);
    } catch {
      throw new Error("we can't load posts");
    } finally {
      setIsLoading(false);
    }
  }

  function handleClearPosts() {
    setPosts([]);
  }

  return (
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        onClearPosts: handleClearPosts,
        onAddPost: handleAddPost,
        searchQuery,
        setSearchQuery,
        emailInfo,
        setEmailInfo,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined) throw new Error("context used outside of scope");
  return context;
}

export { PostProvider, usePosts };
