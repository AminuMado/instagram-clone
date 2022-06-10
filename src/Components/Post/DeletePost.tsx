import "./DeletePost.css";
import deleteSrc from "../../Assets/Images/trashicon.svg";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../Utils/firebase";

type DeletePostProps = {
  post: post;
};
type post = {
  id: string;
  caption: string;
  imageUrl: string;
  username: string;
  avatar: string;
  comments: comment[];
  postBy: string;
  likedBy: [];
};
type comment = {
  text: string;
  username: string;
  id: string;
};
export const DeletePost = (props: DeletePostProps) => {
  const handleClick = async () => {
    await deleteDoc(doc(db, "posts", props.post.id));
  };
  return <img onClick={handleClick} src={deleteSrc} alt="delete" />;
};
