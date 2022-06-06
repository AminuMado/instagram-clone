import "./AddComment.css";
import { useState, useContext } from "react";
import { db } from "../../Utils/firebase";
import { UserContext } from "../../Context/UserContext";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

type AddCommentProps = {
  postId: string;
};

export const AddComment = (props: AddCommentProps) => {
  console.log(props.postId);
  const [comment, setComment] = useState("");
  const { user } = useContext(UserContext);
  const addComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.trim() === "") return;
    if (user) {
      const docRef = doc(db, "posts", `${props.postId}`);
      updateDoc(docRef, {
        comments: arrayUnion({
          id: user.uid,
          text: comment,
          username: user.displayName,
        }),
      });
      setComment("");
    }
  };
  return (
    <form className="post__add_comment" onSubmit={addComment}>
      <input
        aria-label="Add a comment"
        className="post__add_comment_input"
        type="text"
        name="add-comment"
        placeholder="Add a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className="post__add_comment_button" type="submit">
        Post
      </button>
    </form>
  );
};
