import { useState } from "react";
import "./NewPost.css";
import { storage } from "../../Utils/firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getMetadata,
} from "firebase/storage";

type ImageUploadProps = {
  active: boolean;
};
export const ImageUpload = (props: ImageUploadProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };
  const handleUpload = () => {
    // we are tryping to upload a file to the storage
    // get the file's url  we just stored
    // use that url to save the file on our db
    // add a user id and username to the post uploaded
    // Upload
    if (image) {
      const imageRef = ref(storage, `images/${image.name}`);
      uploadBytesResumable(imageRef, image)
        .then((snapshot) => {
          console.log("Uploaded", snapshot.totalBytes, "bytes.");
          console.log("File metadata:", snapshot.metadata);
          // Let's get a download URL for the file.
          getDownloadURL(snapshot.ref).then((url) => {
            console.log("File available at", url);
            // ...
          });
        })
        .catch((error) => {
          console.error("Upload failed", error);
          // ...
        });
    }

    // const uploadTask = storage.ref(`images${image.name}`).put(image);
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
    <div className={props.active ? "imageupload active" : "imageupload"}>
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
