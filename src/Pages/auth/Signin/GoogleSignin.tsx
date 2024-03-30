import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { authUser } from "../../../Config/FireBaseConfig";
import { GreenContext } from "../../../Providers/LocalContextProvider";
import { useContext, useState } from "react";
import { localContextType } from "../../../Providers/LocalContextProvider";
import { updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../Config/FireBaseConfig";

type userDataType = {
  user_email: string;
  user_avatar: { src: string; id: string | null };
  user_name: string;
  is_verified: boolean;
  user_uuid: string;
  user_phone: string;
  user_role: string;
};
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
        const data = result?.user;
        const user = {
          user_email: data.email,
          user_avatar: {
            src: data.photoURL,
            id: null,
          },
          user_name: data.displayName,
          is_verified: data.emailVerified,
          user_uuid: data.uid,
          user_phone: data.phoneNumber,
          user_role: "customer",
        } as userDataType;

        if (data) {
          setUserData(user);
          dispatch({ cusrrentUser: userData });
        }
        updateUserDocInUsersCollectionDB(user).then(res => {
          if (res) {
            window.location.replace("/");
          }
        });
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        dispatch({ isLogedIn: true });
        // window.location.replace("/");
      });
  };

  const updateUserDocInUsersCollectionDB = async (user: userDataType) => {
    // console.log(user);
    // console.log(user.phone);
    const docRef = doc(db, "users", user.user_uuid);
    await updateDoc(docRef, {
      is_verified: user.is_verified,
      user_avatar: {
        src: user.user_avatar.src,
        id: null,
      },
      user_updatedAT: serverTimestamp(),
      user_name: user.user_name,
      user_phone: user.user_phone,
      user_role: "customer",
    });

    // console.log(res);
    // console.log("user updated");
    // console.log(docRef);

    return true;
  };

  return (
    <div onClick={handleSignwithGoogle} className="google-sign-in-btn">
      <img src="/img/icons/google-icon.png" alt="google icon" />
      <p>Sign in with Google</p>
    </div>
  );
}
