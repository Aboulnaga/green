import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { authUser } from "../../../Config/FireBaseConfig";
import { GreenContext } from "../../../Providers/LocalContextProvider";
import { useContext, useState } from "react";
import { localContextType } from "../../../Providers/LocalContextProvider";
export default function GoogleSignin() {
  const provider = new GoogleAuthProvider();
  const [userData, setUserData] = useState({});
  const { dispatch } = useContext(GreenContext) as localContextType;

  const handleSignwithGoogle = () => {
    signInWithPopup(authUser, provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential?.accessToken;
        const user = result?.user;

        if (user) {
          setUserData({
            email: user.email,
            avatar: user.photoURL,
            displayName: user.displayName,
            isVerified: user.emailVerified,
            uuid: user.uid,
          });
          dispatch({ cusrrentUser: userData });
        }
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        dispatch({ isLogedIn: true });
        window.location.replace("/");
      });
  };

  return (
    <div onClick={handleSignwithGoogle} className="google-sign-in-btn">
      <img src="/img/icons/google-icon.png" alt="google icon" />
      <p>Sign in with Google</p>
    </div>
  );
}
