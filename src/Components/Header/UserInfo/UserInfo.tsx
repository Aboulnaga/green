import { useEffect, useMemo, useState, useRef } from "react";
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
  // const avatar = user?.user_avatar;
  const displayName = user?.user_name;
  const isVerified = user?.is_verified;
  const userRole = user?.user_role;
  const doNav = useNavigate();
  const [userData, setUserData] = useState<userDataTape | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [verifiedIconHover, setVerifiedIconHover] = useState(false);
  const userInfCompRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: any) => {
    if (!userInfCompRef.current?.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  const chsekUserNameAndImg = () => {
    if (authUser.currentUser) {
      const defName = authUser.currentUser?.displayName || email?.split("@")[0];
      const defImg = authUser.currentUser?.photoURL;
      setUserData({ userName: defName, userImg: defImg } as userDataTape);
    }
  };

  const memoChekUserNameAndImg = useMemo(() => {
    return chsekUserNameAndImg();
  }, [authUser.currentUser?.uid]);

  useEffect(() => {
    memoChekUserNameAndImg;
  }, [authUser.currentUser?.uid]);

  //   console.log(userData);
  // console.log(!!authUser && !!authUser.currentUser?.uid);
  return (
    <div ref={userInfCompRef} className="user-info-comp">
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
              <div className="name">
                <p>{displayName}</p>
                {isVerified ? (
                  <div
                    onMouseEnter={() => setVerifiedIconHover(true)}
                    onMouseLeave={() => setVerifiedIconHover(false)}
                    className="verified"
                  >
                    <div
                      className={verifiedIconHover ? "display-msg msg" : "msg"}
                    >
                      <p>verified account</p>
                      <p>{userRole}</p>
                    </div>
                    <svg
                      fill="none"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clipRule="evenodd"
                        d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM11.2071 16.2071L18.2071 9.20711L16.7929 7.79289L10.5 14.0858L7.20711 10.7929L5.79289 12.2071L9.79289 16.2071C9.98043 16.3946 10.2348 16.5 10.5 16.5C10.7652 16.5 11.0196 16.3946 11.2071 16.2071Z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </div>
                ) : null}
              </div>

              <div className="email">
                <p>{email}</p>
              </div>
            </div>

            <div className="user-dashboard-links">
              <div className="user-dashboard">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    doNav("u/dashboard/");
                  }}
                >
                  Dashboard
                </button>
              </div>
              <div className="user-settings">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    doNav("u/dashboard/settings/");
                  }}
                >
                  Settings
                </button>
              </div>
            </div>
            <div className="log-out">
              <button
                onClick={() => {
                  signOut(authUser);
                  window.location.replace("/");
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
