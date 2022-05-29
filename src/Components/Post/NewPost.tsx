import { useState } from "react";
import "./NewPost.css";

export const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleChange = (e: any) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    // // const uploadTask  = storage.ref(`images${image.name}`).put(image);
    // uploadTask.on(
    //   "state_changed",
    //   (snapshot) => {
    //     //progress funtion ...
    //     const progress = Math.round(
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //     );
    //     setProgress(progress);
    //   },
    //   (error) => {
    //     //Error function ...
    //     console.log(error);
    //     alert(error.message);
    //   },
    //   () => {
    //     //completed function ...
    //     storage
    //       .ref("images")
    //       .child(image.name)
    //       .getDownloadURL()
    //       .then((url) => {
    //         // post image inside db
    //         db.collection(
    //           "posts".add({
    //             timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    //             caption: caption,
    //             imageUrl: url,
    //             username: username, // note this is passed as a prop
    //           })
    //         );
    //         setProgress(0);
    //         setCaption("");
    //         setImage(null);
    //       });
    //   }
    // );
  };
  return (
    <div className="imageupload">
      <progress className="imageupload__progress" value={progress} max="100" />
      <input
        type={"text"}
        placeholder="Enter a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <input type={"file"} onChange={handleChange} />
      <button onClick={handleUpload}>upload</button>
    </div>
  );
};
