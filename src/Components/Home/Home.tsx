import { Navbar } from "../Navbar/Navbar";
import { ImageUpload } from "../Post/NewPost";
import { Post } from "../Post/Post";
import "./Home.css";

export const Home = () => {
  return (
    <div className="Home">
      <Navbar />
      <Post />
      <ImageUpload />
    </div>
  );
};
