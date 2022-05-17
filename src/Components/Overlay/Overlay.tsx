import "./Overlay.css";
type OverlayProps = {
  active: boolean;
  handleClick: () => void;
};
export const Overlay = (props: OverlayProps) => {
  return (
    <div
      onClick={props.handleClick}
      className={props.active ? "overlay active" : "overlay"}
    ></div>
  );
};
export default Overlay;
