import { useParams, Link, useNavigate } from "react-router-dom";
import { usePosts } from "../contexts/postContext";

import Footer from "../components/Footer";
import MyComponent from "../components/content";
import { format } from "date-fns";
import { useEffect } from "react";
import PostHeader from "../components/PostHeader";

import moment from "moment";

function PostPage() {
  const {
    postInfo,
    setPostInfo,
    comment,
    setComment,
    emailInfo,

    onDelete,
    comments,
    setComments,
  } = usePosts();

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://blog-website-api-murex.vercel.app/post/` + id).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, [postInfo]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `https://blog-website-api-murex.vercel.app/comment/${postInfo._id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        const comments = await response.json();
        setComments(comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
        // Handle error, e.g., set default comments or show error message
      }
    };

    fetchComments();
  }, [comments, postInfo._id]);

  // console.log(comments);

  // useEffect(() => {
  //   fetch("http://localhost:4000/profile", {
  //     credentials: "include",
  //   }).then((response) => {
  //     response.json().then((userInfo) => {
  //       setEmailInfo(userInfo);
  //     });
  //   });
  // }, [emailInfo]);
  function onDeletePost(e) {
    e.preventDefault();
    onDelete(id);
    navigate(`/`);
  }

  if (!postInfo) return "";

  const email = emailInfo?.email;

  async function handleAddComment(e) {
    e.preventDefault();

    // Add the new object to the beginning of the array
    const res = await fetch(`https://blog-website-api-murex.vercel.app/comment`, {
      method: "POST",
      body: JSON.stringify({ postId: id, comment, email }),

      headers: {
        "Content-Type": "application/json",
      },
    });
    // const data = await res.json();
    if (res.ok) {
      setComment("");
    }
  }

  return (
    <>
      <PostHeader />
      <div className="px-40 mb-16 text-left phone:px-4 p-tab:px-10 tablet:px-20 laptop:px-40">
        <h3 className="text-center text-xl font-bold text-inherit phone:text-sm p-tab:text-md tablet:text-lg laptop:text-xlg bigdesktop:text-4xl bigdesktop:mb-10">
          {postInfo.title}
        </h3>
        <time className="flex justify-center mb-4 font-normal  text-sm bigdesktop:text-2xl">
          {format(new Date(postInfo.createdAt), "MMM d, yyyy HH:mm")}
        </time>
        <p className="text-center mb-8 font-normal bigdesktop:text-2xl">
          by {postInfo.author.email}
        </p>
        {emailInfo?.id === postInfo.author._id && (
          <div className="flex justify-center mt-12 gap-6">
            <div className="inline-block bigdesktop:text-3xl">
              <Link
                to={`/edit/${postInfo._id}`}
                className="flex justify-center items-center gap:4 bg-green-800 py-2 px-4 text-white gap-x-1 rounded-sm text-center phone:mb-8"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 bigdesktop:w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>

                <p className="flex bg-grren-800">EDIT POST</p>
              </Link>
            </div>

            <div className="inline-block ml-2 bigdesktop:text-3xl">
              <div className="flex justify-center items-center bg-green-800 py-2 px-4 text-white gap-x-1 rounded-sm text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 bigdesktop:w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                  />
                </svg>

                <button onClick={onDeletePost} className="flex bg-grren-800">
                  DELETE
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <MyComponent htmlContent={postInfo.content} />

      {email && (
        <form
          className="px-40 mt-20 phone:px-6 p-tab:px-10 tablet:px-20 laptop:px-40"
          onSubmit={handleAddComment}
        >
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write comment......."
            className="
              bg-inherit focus:text-inherit caret-white placeholder:px-4 w-2/3 text-black rounded-sm phone:w-full p-tab:w-9/12 laptop:w-10/12 h-20 border-green-600 focus:outline-green-600 caret-gray-900 bigdesktop:h-64 bigdesktop:placeholder:text-3xl bigdesktop:placeholder:text-center bigdesktop:text-3xl"
          />
          <div className="mb-16">
            <button className="mt-5 bg-green-500 border-green-500 text-white rounded-sm hover:bg-green-400 inline-block px-5 py-2 phone:w-full p-tab:w-5/12 laptop:w-3/12 bigdesktop:h-32 bigdesktop:text-4xl">
              Add comment
            </button>
          </div>
        </form>
      )}

      <div className="pl-30 pr-60 phone:pl-1 pr-1 p-tab:pl-6 pr-8 tablet:pl-20 pr-40 laptop:pl-20 pr-40">
        <h2 className=" text-inherit font-medium phone:text-center bigdesktop:text-4xl">
          {comments.length} Comments
        </h2>

        <ul className="phone:full">
          {comments.length > 0 &&
            comments.map((comment) => (
              <li
                key={comment._id}
                className="pb-4 pt-4 border-b flex gap-x-6 phone:flex-col items-center p-tab:items-start px-4 w-full laptop:flex-row bigdesktop:pt-20"
              >
                <h3 className="text-inherit font-medium bigdesktop:text-4xl">
                  {comment.author}:
                </h3>
                <p className="text-sm">{moment(comment.createdAt).fromNow()}</p>
                <p className="text-base ml-2 w-8/12  break-words bigdesktop:text-3xl">
                  {comment.comment}
                </p>
              </li>
            ))}
        </ul>
      </div>

      <Footer />
    </>
  );
}

export default PostPage;
