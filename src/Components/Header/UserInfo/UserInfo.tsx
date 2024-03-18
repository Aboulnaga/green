import { useEffect, useMemo, useState, useContext } from "react";
import useCurrentUser from "../../../Hooks/useCurrentUser";
import { authUser } from "../../../Config/FireBaseConfig";
import { signOut } from "firebase/auth";
import { CusrrentUserType } from "../../../Hooks/useCurrentUser";
import DefAvatarSvg from "./DefAvatarSvg";
import { GreenContext } from "../../../Providers/LocalContextProvider";
import { localContextType } from "../../../Providers/LocalContextProvider";

export default function UserInfo() {
  const { dispatch } = useContext(GreenContext) as localContextType;
  const currentUser = useCurrentUser();
  const { email, avatar, displayName } = currentUser as CusrrentUserType;
  const [userData, setUserData] = useState<{
    userName: string;
    userImg: string | null | undefined;
  }>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const chsekUserNameAndImg = () => {
    const defName = displayName || email?.split("@")[0];
    const defImg = avatar;
    setUserData({ userName: defName, userImg: defImg });
  };

  const memoChekUserNameAndImg = useMemo(() => {
    chsekUserNameAndImg();
  }, [currentUser]);

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
            <div className="user-profile">
              <button>Profile</button>
            </div>
            <div className="user-dashboard">
              <button>Dashboard</button>
            </div>
            <div className="log-out">
              <button
                onClick={() => {
                  signOut(authUser);
                  dispatch({ isLogedIn: false });
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
