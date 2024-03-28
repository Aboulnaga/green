import { useEffect, useMemo, useState } from "react";
import { authUser } from "../../../Config/FireBaseConfig";
import { signOut } from "firebase/auth";
import DefAvatarSvg from "./DefAvatarSvg";
import { useNavigate } from "react-router-dom";
import useCurrentUser from "../../../Hooks/useCurrentUser";

type userDataTape = {
  userName: string;
  userImg: string;
};
export default function UserInfo() {
  const user = useCurrentUser();
  const email = user?.user_email;
  const avatar = user?.user_avatar;
  const displayName = user?.user_name;
  const doNav = useNavigate();
  const [userData, setUserData] = useState<userDataTape | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const chsekUserNameAndImg = () => {
    if (user) {
      const defName = displayName || email?.split("@")[0];
      const defImg = avatar;
      setUserData({ userName: defName, userImg: defImg } as userDataTape);
    }
  };

  const memoChekUserNameAndImg = useMemo(() => {
    chsekUserNameAndImg();
  }, [user?.user_id]);

  useEffect(() => {
    memoChekUserNameAndImg;
  }, []);

  //   console.log(userData);

  return (
    <div className="user-info-comp">
      <div className="user-info">
        <div
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={
            isMenuOpen
              ? "user-info-icon user-info-icon-active"
              : "user-info-icon active"
          }
        >
          <div className="avatar">
            {userData?.userImg ? (
              <img
                className="user-avatar"
                src={userData?.userImg}
                alt={userData?.userName}
              />
            ) : (
              <DefAvatarSvg svgClass="user-avatar-svg" />
            )}
          </div>
          <div className="arrow">&#9660;</div>
        </div>
        <div
          className={
            isMenuOpen
              ? "user-data-toggle-menu-container user-data-toggle-menu-container-active"
              : "user-data-toggle-menu-container"
          }
        >
          <div className="user-data-toggle-menu">
            <div className="user-name">
              <h6>{userData?.userName}</h6>
            </div>

            <div className="user-dashboard">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  doNav("u/dashboard");
                }}
              >
                Dashboard
              </button>
            </div>
            <div className="log-out">
              <button
                onClick={() => {
                  signOut(authUser);
                  window.location.reload();
                }}
                type="submit"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
