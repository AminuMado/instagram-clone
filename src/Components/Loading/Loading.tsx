import "./Loading.css";

export const Loading = () => {
  return (
    <div className="loading_overlay active">
      <div className="loading_wrapper">
        <div className="loading_animation"></div>
      </div>
    </div>
  );
};
