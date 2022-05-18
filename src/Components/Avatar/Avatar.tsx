import "./Avatar.css";
type AvatarProps = {
  src: string;
  handleClick: () => void;
};
export const Avatar = (props: AvatarProps) => {
  return (
    <img
      onClick={() => props.handleClick()}
      src={props.src}
      alt="avatar"
      className="avatar"
    ></img>
  );
};
