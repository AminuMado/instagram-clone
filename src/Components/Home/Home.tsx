import { Loading } from "../Loading/Loading";
import { Navbar } from "../Navbar/Navbar";
import { Post } from "../Post/Post";
import "./Home.css";

export const Home = () => {
  return (
    <>
      <Loading />
      <div className="Home">
        <Navbar />
        <Post />
      </div>
    </>
  );
};
