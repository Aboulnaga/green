import { useState } from "react";
import BreadCrumbsComp from "../../../Components/BreadCrumbs/BreadCrumbs";
import { Link } from "react-router-dom";
export default function SigninPage() {
  const [isPwdHidden, setIsPwdHidden] = useState(true);
  return (
    <>
      <div className="breadcrumbs-container">
        <BreadCrumbsComp path={[{ title: "Sign In", url: "auth/sign-in" }]} />
      </div>
      <main className="sign-in-page">
        <div className="sign-in">
          <h2>Sign In</h2>
          <form>
            <input type="email" placeholder="Email" />
            <div className="password">
              <input
                type={isPwdHidden ? "password" : "text"}
                placeholder="Password"
              />

              <div
                onClick={() => setIsPwdHidden(!isPwdHidden)}
                className={isPwdHidden ? "icon" : "icon show-pwd"}
              >
                <svg
                  width="20"
                  height="15"
                  viewBox="0 0 20 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.66663 7.50033C1.66663 7.50033 4.69663 1.66699 9.99996 1.66699C15.3033 1.66699 18.3333 7.50033 18.3333 7.50033C18.3333 7.50033 15.3033 13.3337 9.99996 13.3337C4.69663 13.3337 1.66663 7.50033 1.66663 7.50033Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 10C10.663 10 11.2989 9.73661 11.7678 9.26777C12.2366 8.79893 12.5 8.16304 12.5 7.5C12.5 6.83696 12.2366 6.20107 11.7678 5.73223C11.2989 5.26339 10.663 5 10 5C9.33696 5 8.70107 5.26339 8.23223 5.73223C7.76339 6.20107 7.5 6.83696 7.5 7.5C7.5 8.16304 7.76339 8.79893 8.23223 9.26777C8.70107 9.73661 9.33696 10 10 10V10Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div className="extra">
              <div className="remember-me">
                <input type="checkbox" />
                <p>Remember Me</p>
              </div>
              <div className="forget">
                <p>
                  <Link className="link" to="#">
                    Forget Password
                  </Link>
                </p>
              </div>
            </div>
            <button>Sign In</button>
          </form>

          <p>
            Don't have an account?{" "}
            <Link className="link" to="/auth/sign-up">
              <b>
                <u>Sign Up</u>
              </b>
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
