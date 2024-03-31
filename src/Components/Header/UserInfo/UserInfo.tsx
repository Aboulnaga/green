import { useEffect, useState } from "react";
import { authUser } from "../../../Config/FireBaseConfig";
import { signOut } from "firebase/auth";
import DefAvatarSvg from "../../defSvgProfileImg/DefAvatarSvg";
import { useNavigate } from "react-router-dom";
import useQueryCurrentUser from "../../../Hooks/useQueryCurrentUser";
import Spinner from "../../Spinner/Spinner";
import { Toaster, toast } from "react-hot-toast";

export default function UserInfo() {
  const { isLoading, isError, data: currentUser } = useQueryCurrentUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [verifiedIconHover, setVerifiedIconHover] = useState(false);
  const doNav = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error("Error");
    }
  }, [isError]);

  return (
    <Spinner isLoading={isLoading}>
      <div className="user-info-comp">
        <Toaster
          toastOptions={{ duration: 3000 }}
          position="top-center"
          reverseOrder={false}
        />
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
              {currentUser?.user_avatar.src ? (
                <img
                  className="user-avatar"
                  src={currentUser?.user_avatar.src}
                  alt={
                    currentUser?.user_name ||
                    currentUser?.user_email.split("@")[0]
                  }
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
                  <p>
                    {currentUser?.user_name ||
                      currentUser?.user_email.split("@")[0]}
                  </p>
                  {currentUser?.is_verified ? (
                    <div
                      onMouseEnter={() => setVerifiedIconHover(true)}
                      onMouseLeave={() => setVerifiedIconHover(false)}
                      className="verified"
                    >
                      <div
                        className={
                          verifiedIconHover ? "display-msg msg" : "msg"
                        }
                      >
                        <p>verified account</p>
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
                  <p>{currentUser?.user_email}</p>
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
    </Spinner>
  );
}
