/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { usePosts } from "../contexts/postContext";

function Comments() {
  const [comments, setComments] = usePosts();

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.length > 0 &&
          comments.map((comment) => (
            <li key={comment._id}>
              <h3>{comment.author}:</h3> <p>{comment.text}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Comments;
