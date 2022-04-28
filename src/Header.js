import { ReactComponent as UserSVG } from "./svgs/user.svg";

export default function Header(props) {
  const profileIconStyle = {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    fill: "#fff",
  };
  return (
    <div className="header">
      <span className="logo">NKUST Music</span>
      <span className="user-profile">
        {props.user.avatar ? (
          <img
            style={profileIconStyle}
            src={props.user.avatar}
            alt="user-avatar"
          />
        ) : (
          <UserSVG className="avatar" />
        )}
        {/* tips: 請勿於此直接寫死學號與姓名，請使用 props 傳入與顯示 */}
        <span className="name">{props.user.displayName}</span>
      </span>
    </div>
  );
}
