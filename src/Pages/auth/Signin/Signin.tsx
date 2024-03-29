import { useRef, useState, useContext, useEffect } from "react";
import BreadCrumbsComp from "../../../Components/BreadCrumbs/BreadCrumbs";
import { Link } from "react-router-dom";
import FormErrorMsg from "../../../Components/FormErrorMsg/FormErrorMsg";
import { FormErrorType } from "../../../Components/FormErrorMsg/FormErrorMsg";
import { Z_SigninSchema } from "./Z_SigninSchema";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authUser } from "../../../Config/FireBaseConfig";
import { GreenContext } from "../../../Providers/LocalContextProvider";
import GoogleSignin from "./GoogleSignin";
import { localContextType } from "../../../Providers/LocalContextProvider";
import { Toaster, toast } from "react-hot-toast";
type chckInputsType = {
  email: string;
  password: string;
};
export default function SigninPage() {
  const [error, setError] = useState<FormErrorType | null>(null);
  const [isPwdHidden, setIsPwdHidden] = useState(true);
  const [loading, setLoading] = useState(false);
  const formREf = useRef<HTMLFormElement | null>(null);
  const signinToast = () => toast.success("Sign In Successful");
  const { dispatch } = useContext(GreenContext) as localContextType;
  useEffect(() => {
    error && setLoading(false);
  }, [error]);
  const handelSignInFormSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (!checkSigninInputs(e)) return;
    const { email, password } = checkSigninInputs(e) as chckInputsType;
    const zRes = acceptedByZod(email, password);
    if (!zRes) return;
    const isUserInDB = await userInDatabase(zRes);
    if (!isUserInDB) return;
    if (!setUserInCurrentUserContext()) return;

    // console.log(state.currentUser);

    signinToast();
    setTimeout(() => {
      setLoading(false);
      formREf.current?.reset();
      window.location.replace("/");
    }, 3000);
  };

  const checkSigninInputs = (e: any) => {
    const formData: FormData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    if (!email || !password) {
      return setError([{ error: "Please fill in all fields", path: "email" }]);
    }
    const data = { email, password };
    return data as chckInputsType;
  };

  const acceptedByZod = (email: string, password: string): {} | false => {
    // console.log(email, password);
    const res = Z_SigninSchema.safeParse({ email, password });
    // console.log(res);
    if (!res.success) {
      const mapErrors = res.error.errors.map(err => {
        return { error: err.message, path: err.path[0] };
      }) as FormErrorType;
      // console.log(mapErrors);
      setError(mapErrors);
      return false;
    }

    return {
      email,
      password,
    };
  };

  const userInDatabase = async (data: any) => {
    try {
      const res = await signInWithEmailAndPassword(
        authUser,
        data.email,
        data.password
      );
      return res.user;
      // console.log(res);
    } catch (err) {
      // console.log(err.message);
      setError([{ error: "Something went wrong with data", path: "server" }]);
      return false;
    }
  };

  const setUserInCurrentUserContext = () => {
    authUser.onAuthStateChanged(user => {
      if (user) {
        dispatch({ cusrrentUser: user });
        // console.log(user);
      } else {
        // console.log("user not found");
        dispatch({ cusrrentUser: null });
        setError([
          {
            error: "cant set user in our context",
            path: "server",
          },
        ]);
        return false;
      }
    });

    return true;
  };

  return (
    <>
      <div className="breadcrumbs-container">
        <BreadCrumbsComp
          path={[
            { title: "Home", url: "/" },
            { title: "Sign In", url: "/auth/sign-in" },
          ]}
        />
      </div>
      <main className="sign-in-page">
        <Toaster
          position="top-right"
          toastOptions={{ duration: 5000 }}
          reverseOrder={false}
        />
        <div className="sign-in">
          <h2>Sign In</h2>
          <form ref={formREf} onSubmit={handelSignInFormSubmit}>
            <div className="email">
              <input name="email" type="email" placeholder="Email" />
            </div>
            <div className="password">
              <input
                type={isPwdHidden ? "password" : "text"}
                placeholder="Password"
                name="password"
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
            <div className="submit">
              {loading ? (
                <div className="loader-container">
                  <span className="signup-loader"></span>
                </div>
              ) : (
                <button type="submit">Sign in</button>
              )}
              {error && error?.length === 2 ? (
                <FormErrorMsg
                  userClass="sign-in-error-msg"
                  path="password"
                  key="password"
                  errors={error}
                />
              ) : (
                <>
                  <FormErrorMsg
                    userClass="sign-in-error-msg"
                    path="password"
                    key="password"
                    errors={error}
                  />
                  <FormErrorMsg
                    userClass="sign-in-error-msg"
                    path="email"
                    key="email"
                    errors={error}
                  />
                </>
              )}
              <FormErrorMsg
                userClass="sign-in-error-msg"
                path="server"
                key="server"
                errors={error}
              />
            </div>
          </form>

          <div className="google-sign-in-container">
            <GoogleSignin />
          </div>

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
