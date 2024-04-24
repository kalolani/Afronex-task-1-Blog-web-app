import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PostHeader from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../contexts/postContext";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ],
};

function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(null);
  const [expertise, setExpertise] = useState("");
  const navigate = useNavigate();
  const { onUpdate } = usePosts();

  useEffect(() => {
    fetch(`https://blog-website-api-murex.vercel.app/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setExpertise(postInfo.expertise);
      });
    });
  }, [id]);

  function handleUpdate(e) {
    e.preventDefault();

    onUpdate({ title, content, expertise, id });
    navigate(`/post/${id}`);
  }

  return (
    <div className="h-full">
      <PostHeader />

      <form
        onSubmit={handleUpdate}
        className="max-w-4xl m-auto phone:w-3/4 p-0"
      >
        <h3 className="text-center text-gray-500 font-semibold tracking-wider">
          START WRITING YOUR BLOG !
        </h3>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          className="text-black w-full inline-block mb-4 border-lime-500 focus:outline-lime-500"
        />

        <input
          value={expertise}
          onChange={(e) => setExpertise(e.target.value)}
          placeholder="expertise"
          className="text-black w-full inline-block mb-4 border-lime-500 focus:outline-lime-500"
        />

        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
        />
        <button className="mt-10 bg-green-500 border-green-500 text-white rounded-sm hover:bg-green-400 inline-block px-5 py-2 ">
          EDIT POST
        </button>
      </form>

      <Footer />
    </div>
  );
}

export default EditPost;
