import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import BreadCrumbsComp from "../../../Components/BreadCrumbs/BreadCrumbs";
import FormErrorMsg from "../../../Components/FormErrorMsg/FormErrorMsg";
import { FormErrorType } from "../../../Components/FormErrorMsg/FormErrorMsg";
import { signupSchema } from "./Zschema";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { setDoc, serverTimestamp, doc } from "firebase/firestore";
import { authUser, db } from "../../../Config/FireBaseConfig";
import { Toaster, toast } from "react-hot-toast";

type FormInputsType = {
  email: string;
  password: string;
  confirmPassword: string;
};

type createdUserDataType = {
  userID: string;
  userEmail: string;
  userName: string | null;
  isVerified: boolean;
  userAvatar: string | null;
};

export default function SignupPage() {
  const [isRememberMe, setIsRememberMe] = useState<boolean>(false);
  const [isError, setIsError] = useState<FormErrorType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const sucessSignUpMSG = () => toast.success("Sign Up Successful");

  useEffect(() => {
    isError && setLoading(false);
  }, [isError]);
  const handleFormSubmit = async (e: any) => {
    // console.log(serverTimestamp());
    setIsError(null);
    setLoading(true);
    e.preventDefault();
    if (!checkIfAllTermessAccepted()) return;
    const formData = handleFormInput(e) as FormInputsType;
    if (!handleFormDataInputsByZod(formData)) return;
    if (!checkMatchedPassword(formData.password, formData.confirmPassword))
      return;
    const createdUserData = await createNewUserWithEmailAndPassword(formData);
    // console.log(createdUserData);
    if (!createdUserData) return;
    const { userEmail } = createdUserData as createdUserDataType;
    const verificationEmail = await sendEmailVerificationLink(userEmail);
    if (!verificationEmail) return;
    if (!setDataInUsersCollection(authUser.currentUser)) return;
    setIsError(null);
    sucessSignUpMSG();
    setTimeout(() => {
      setLoading(false);
      formRef.current?.reset();
      window.location.replace("/auth/verify-email/");
    }, 3000);
    // console.log(verificationEmail);
    // console.log(createdUserData);
    // console.log(formData);
    // console.log("submitted");
  };

  const checkIfAllTermessAccepted = () => {
    if (!isRememberMe) {
      return setIsError([
        {
          error: "Please read and accept the terms and conditions",
          path: "server",
        },
      ]);
    }

    return true;
  };

  const handleFormInput = (e: any) => {
    const formData: FormData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const data = { email, password, confirmPassword };
    return data;
  };

  const handleFormDataInputsByZod = (formdata: any) => {
    const z_Check = signupSchema.safeParse(formdata);
    if (!z_Check.success) {
      const mapError = z_Check.error.issues.map(err => {
        return { error: err.message, path: err.path[0] };
      }) as FormErrorType;
      setIsError(mapError);
      return;
    }
    return true;
    // console.log(suc.data);
  };

  const checkMatchedPassword = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      return setIsError([
        {
          error: "passwords don't match",
          path: "password",
        },
        {
          error: "passwords don't match",
          path: "confirmPassword",
        },
      ]);
    }
    return true;
  };

  const createNewUserWithEmailAndPassword = async (data: any) => {
    try {
      const newUser = await createUserWithEmailAndPassword(
        authUser,
        data.email,
        data.password
      );

      const user = {
        userName: newUser.user.displayName,
        userID: newUser.user.uid,
        userEmail: newUser.user.email,
        isVerified: newUser.user.emailVerified,
        userAvatar: newUser.user.photoURL,
      };

      // console.log(user);

      return user as createdUserDataType;
    } catch (error: any) {
      // console.log(error.message);
      return setIsError([
        {
          error: error.message,
          path: "server",
        },
      ]);
    }
  };

  const sendEmailVerificationLink = async (userEmail: string) => {
    try {
      const currentUserEmail = authUser.currentUser?.email;
      if (currentUserEmail !== userEmail) {
        throw new Error("Something went wrong in email");
      }
      currentUserEmail && (await sendEmailVerification(authUser.currentUser!));
      return true;
    } catch (error: any) {
      // console.log(error.message);
      return setIsError([
        {
          error: error.message,
          path: "server",
        },
      ]);
    }
  };

  const setDataInUsersCollection = async (data: any) => {
    // user_createdAT: Timestamp.fromDate(new Date("December 10, 1815")),
    // user_updatedAT: Timestamp.fromDate(new Date("December 10, 1815")),
    try {
      const userData = {
        user_name: data.displayName,
        user_id: data.uid,
        user_email: data.email,
        is_verified: data.emailVerified,
        user_createdAT: serverTimestamp(),
        user_updatedAT: serverTimestamp(),
        user_avatar: {
          src: data.photoURL,
          id: null,
        },
        user_role: "customer",
        user_phone: "",
      };
      const res = await setDoc(doc(db, "users", data.uid), userData);
      return res;
    } catch (error: any) {
      // console.log(error.message);
      return setIsError([
        {
          error: error.message,
          path: "server",
        },
      ]);
    } finally {
      signOut(authUser);
      return true;
    }
  };

  return (
    <>
      <Helmet>
        <title>Green - Sign Up</title>
      </Helmet>
      <div className="breadcrumbs-container">
        <BreadCrumbsComp
          path={[
            { title: "Home", url: "/" },
            { title: "Sign up", url: "/auth/sign-up" },
          ]}
        />
      </div>
      <main className="sign-up-page">
        <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
        <div className="terms-and-cond"></div>
        <div className="sign-up">
          <h2>Sign Up</h2>
          <form ref={formRef} onSubmit={handleFormSubmit}>
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
                <input
                  onChange={e => setIsRememberMe(e.target.checked)}
                  type="checkbox"
                />
                <Link target="_blank" to={"/terms-and-conditions/"}>
                  Accept All Terms and Conditions
                </Link>
              </div>
            </div>
            <div className="submit">
              {loading ? (
                <div className="loader-container">
                  <span className="signup-loader"></span>
                </div>
              ) : (
                <button type="submit">Sign up</button>
              )}

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
