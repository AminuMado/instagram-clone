import "./Overlay.css";
type OverlayProps = {
  showOverlay: boolean;
};
export const Overlay = (props: OverlayProps) => {
  return (
    <div className={props.showOverlay ? "overlay active" : "overlay"}></div>
  );
};
export default Overlay;
