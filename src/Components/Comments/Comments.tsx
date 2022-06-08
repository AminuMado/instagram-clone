import { useState, useEffect } from "react";
import { db } from "../../Utils/firebase";
import "./Comments.css";
import { doc, getDoc } from "firebase/firestore";
type CommentsProps = {
  postId: string;
};
type comment = {
  text: string;
  username: string;
  id: string;
};
export const Comments = (props: CommentsProps) => {
  const [comments, setComments] = useState<comment[]>([]);
  useEffect(() => {
    const docRef = doc(db, "posts", `${props.postId}`);
    getDoc(docRef).then((doc) => {
      const data = doc.data()?.comments;
      setComments(data);
    });
  }, [comments, props.postId]);

  const result = comments.map((comment, index) => (
    <h6 className="post__comment" key={index}>
      <strong>{comment.username}:</strong>
      {comment.text}
    </h6>
  ));

  return <>{result}</>;
};
