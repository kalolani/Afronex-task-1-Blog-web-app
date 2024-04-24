/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

const PostContext = createContext();

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [emailInfo, setEmailInfo] = useState({});
  const [comment, setComment] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [postInfo, setPostInfo] = useState("");
  const [comments, setComments] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // console.log(posts);
  useEffect(() => {
    fetch(`https://blog-website-api-murex.vercel.app/post`).then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, [posts]);

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.author.email}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  async function handleAddPost(post) {
    console.log(post);
    try {
      setIsLoading(true);
      // Add the new object to the beginning of the array
      const res = await fetch(`https://blog-website-api-murex.vercel.app/post`, {
        method: "POST",
        body: JSON.stringify(post),

        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (res.ok) {
        setRedirect(true);
      }
    } catch {
      throw new Error("we can't load posts");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdatePost(post) {
    try {
      setIsLoading(true);
      // Add the new object to the beginning of the array
      const res = await fetch(`https://blog-website-api-murex.vercel.app/post`, {
        method: "PUT",
        body: JSON.stringify(post),

        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      // const data = await res.json();
    } catch {
      throw new Error("we can't load posts");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeletePost(postId) {
    try {
      setIsLoading(true);

      const res = await fetch(`https://blog-website-api-murex.vercel.app/post/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to delete post");
      }

      // Optional: If you expect a response from the server, you can parse it here
      // const data = await res.json();

      // Return data if needed
      // return data;
    } catch (error) {
      console.error("Error deleting post:", error);
      throw new Error("Failed to delete post");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <PostContext.Provider
      value={{
        posts: searchedPosts,

        onAddPost: handleAddPost,
        onUpdate: handleUpdatePost,
        onDelete: handleDeletePost,

        searchQuery,
        setSearchQuery,
        emailInfo,
        setEmailInfo,
        redirect,
        setRedirect,

        setIsLoading,
        isLoading,
        comment,
        setComment,
        postInfo,
        setPostInfo,
        comments,
        setComments,
        isOpen,
        setIsOpen,
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
