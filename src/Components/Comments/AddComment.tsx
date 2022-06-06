import "./AddComment.css";
import { useState } from "react";
const AddComment = () => {
  const [comment, setComment] = useState("");
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
