import { useContext } from "react";
import { LoadingContext } from "../../Context/LoadingContext";
import "./Loading.css";

export const Loading = () => {
  const { isLoading } = useContext(LoadingContext);
  return (
    <div className={isLoading ? "loading_overlay active" : "loading_overlay"}>
      <div className="loading_wrapper">
        <div className="loading_animation"></div>
      </div>
    </div>
  );
};
