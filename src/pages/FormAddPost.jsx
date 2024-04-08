import { useState } from "react";
import { usePosts } from "../contexts/postContext";
import { useNavigate } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

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

function FormAddPost() {
  const { onAddPost } = usePosts();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(null);
  const [author, setAuthor] = useState("");
  const [expertise, setExpertise] = useState("");
  const [date] = useState(formatDate(new Date()));
  const navigate = useNavigate();

  const handleSubmit = function (e) {
    e.preventDefault();
    if (!content || !title) return;
    onAddPost({ title, content, author, expertise, date });
    setTitle("");
    setContent("");
    navigate(-1);
  };

  return (
    <div className="h-full">
      <Header />

      <form onSubmit={handleSubmit} className="max-w-4xl m-auto">
        <h3 className="text-center text-gray-500 font-semibold tracking-wider">
          START WRITING YOUR BLOG !
        </h3>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          className="w-full inline-block mb-4 border-lime-500 focus:outline-lime-500"
        />
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Post author"
          className="w-full inline-block mb-4 border-lime-500 focus:outline-lime-500"
        />
        <input
          value={expertise}
          onChange={(e) => setExpertise(e.target.value)}
          placeholder="expertise"
          className="w-full inline-block mb-4 border-lime-500 focus:outline-lime-500"
        />

        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          className="border-lime-500 focus:outline-lime-500"
        />
        <button className="mt-8 bg-green-400 border-lime-500 text-white mb-14">
          Add post
        </button>
      </form>

      <Footer />
    </div>
  );
}

export default FormAddPost;
