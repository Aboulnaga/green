import { useEffect, useState } from "react";
import { authUser } from "../../../Config/FireBaseConfig";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import BreadCrumbsComp from "../../../Components/BreadCrumbs/BreadCrumbs";
import { Link } from "react-router-dom";
import { signupSchema } from "./Zschema";
import { SafeParseError, SafeParseSuccess } from "zod";
import { FormErrorType } from "../../../Components/FormErrorMsg/FormErrorMsg";
import FormErrorMsg from "../../../Components/FormErrorMsg/FormErrorMsg";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  useEffect(() => {
    const checkUser = async () => {
      const user = await authUser.currentUser?.email;
      if (user) {
        console.log(user);
      }
    };
    checkUser();
    return () => {
      console.log("unmounted");
    };
  }, []);
  const [isError, setIsError] = useState<FormErrorType | false>(false);
  const [submitUser, setSubmitUser] = useState<false | true>(false);
  const doNav = useNavigate();
  const sucessSignUpMSG = () => toast.success("Sign Up Successful");

  const createUser = async (data: any) => {
    try {
      setIsError(false);
      await createUserWithEmailAndPassword(authUser, data.email, data.password);

      // Signed in

      // console.log(userCredential);
    } catch (e) {
      // console.log(e);
      if (e) {
        setSubmitUser(true);
        setTimeout(() => {
          setIsError([
            {
              error: "Something went wrong or user already exist",
              path: "server",
            },
          ]);
          setSubmitUser(false);
        }, 3000);
      } else {
        setIsError(false);
      }

      return;
    } finally {
      setIsError(false);
      setSubmitUser(true);
      sucessSignUpMSG();
      setTimeout(() => {
        setSubmitUser(false);

        if (authUser.currentUser?.emailVerified) {
          doNav("/auth/sign-in");
        } else {
          authUser.currentUser?.email &&
            sendEmailVerification(authUser.currentUser);
          doNav("/auth/verify-email");
        }
      }, 3000);
    }
  };

  console.log("user data");
  console.log("email", authUser.currentUser?.email);
  console.log("verified", authUser.currentUser?.emailVerified);
  const handleNewUser = (e: any) => {
    e.preventDefault();
    setIsError(false);
    const formData: FormData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const data = { email, password, confirmPassword };

    // console.log(data);

    const z_Check = signupSchema.safeParse(data);
    // console.log(z_Check);
    if (z_Check.success) {
      if (password !== confirmPassword) {
        const errors = [
          { error: "passwords don't match", path: "password" },
          { error: "passwords don't match", path: "confirmPassword" },
        ];
        setIsError(errors);
        return;
      }
      setIsError(false);
      const suc = z_Check as SafeParseSuccess<typeof data>;
      createUser(suc.data);
      // console.log(suc.data);
    } else {
      const error = z_Check as SafeParseError<typeof data>;
      const mapError = error.error.issues.map(err => {
        return { error: err.message, path: err.path[0] };
      }) as FormErrorType;

      setIsError(mapError);

      // console.log(mapError);
    }
  };

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <div className="breadcrumbs-container">
        <BreadCrumbsComp path={[{ title: "Sign up", url: "auth/sign-up" }]} />
      </div>
      <main className="sign-up-page">
        <div className="sign-up">
          <h2>Sign Up</h2>
          <form onSubmit={handleNewUser}>
            <div className="email">
              <input name="email" type="email" placeholder="Email" />
              <FormErrorMsg
                userClass="signup-error"
                errors={isError}
                path="email"
              />
            </div>
            <div className="password">
              <input name="password" type="password" placeholder="Password" />
              <FormErrorMsg
                userClass="signup-error"
                errors={isError}
                path="password"
              />
            </div>
            <div className="confirm-password">
              <input
                name="confirmPassword"
                type="password"
                placeholder="Password"
              />
              <FormErrorMsg
                userClass="signup-error"
                errors={isError}
                path="confirmPassword"
              />
            </div>

            <div className="extra">
              <div className="remember-me">
                <input type="checkbox" />
                <p>Accept All Terms and Conditions </p>
              </div>
            </div>
            <div className="submit">
              <button>{submitUser ? "Creating new user..." : "Sign Up"}</button>
              <FormErrorMsg
                userClass="signup-error"
                errors={isError}
                path="server"
              />
            </div>
          </form>

          <p>
            already have an account?{" "}
            <Link className="link" to="/auth/sign-in">
              <b>
                <u>Sign in</u>
              </b>
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
