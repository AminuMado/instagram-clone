import "./DeletePost.css";
import deleteSrc from "../../Assets/Images/trashicon.svg";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../Utils/firebase";

type DeletePostProps = {
  postId: string;
};

export const DeletePost = (props: DeletePostProps) => {
  const handleClick = async () => {
    await deleteDoc(doc(db, "posts", props.postId));
  };
  return (
    <img
      onClick={handleClick}
      src={deleteSrc}
      alt="delete"
      className="deleteIcon"
    />
  );
};
