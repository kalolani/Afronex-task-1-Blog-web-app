/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { usePosts } from "../contexts/postContext";
import styles from "./Body.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MyComponent from "../components/content";
function Body() {
  const { posts } = usePosts();
  const { i } = useParams();

  return (
    <>
      <Header />
      <div className="px-40 mb-16">
        <p className="mb-8 font-normal text-gray-500">{posts[i].date}</p>
        <h3 className="text-gray-900 text-xl font-bold">{posts[i].title} ,</h3>
        <MyComponent htmlContent={posts[i].content} />
      </div>
      <Footer />
    </>
  );
}
export default Body;
