import { useState, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import "./NewPost.css";
import { storage, db } from "../../Utils/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
type ImageUploadProps = {
  active: boolean;
};
export const ImageUpload = (props: ImageUploadProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");
  const { user } = useContext(UserContext);
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
          //progress funtion ...
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);

          // Let's get a download URL for the file.
          getDownloadURL(snapshot.ref).then(async (url) => {
            console.log("File available at", url);
            // add post inside db
            if (user) {
              const docRef = await addDoc(collection(db, "posts"), {
                timestamp: serverTimestamp(),
                caption: caption,
                imageUrl: url,
                username: user.displayName, // note this is passed as a prop
                avatar: user.photoURL,
              });
              //add the docRef.id
              const post = doc(db, "posts", docRef.id);
              await updateDoc(post, { id: docRef.id });
              console.log("Document written with ID: ", docRef.id);
            }
          });
          //Clean up the various states
          setProgress(0);
          setCaption("");
          setImage(null);
        })
        .catch((error) => {
          console.error("Upload failed", error);
          alert(error.message);
        });
    }
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
