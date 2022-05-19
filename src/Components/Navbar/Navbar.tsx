import "./Navbar.css";
import settings1_Src from "../../Assets/Images/settings1.png";
import settings2_Src from "../../Assets/Images/settings2.png";
export const Navbar = () => {
  return (
    <div className="navbar">
      <h1>Star Wars World</h1>
      {/* <img src={settings1_Src}></img> */}
      <img src={settings2_Src}></img>
    </div>
  );
};
