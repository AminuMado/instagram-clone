import { Navbar } from "../Navbar/Navbar";
import { Post } from "../Post/Post";
import "./Home.css";

export const Home = () => {
  return (
    <div className="Home">
      <Navbar />
      <Post />
    </div>
  );
};
