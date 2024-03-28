import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { authUser } from "../../../Config/FireBaseConfig";
import { GreenContext } from "../../../Providers/LocalContextProvider";
import { useContext, useState } from "react";
import { localContextType } from "../../../Providers/LocalContextProvider";
import { updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../Config/FireBaseConfig";

type userDataType = {
  email: string;
  avatar: string;
  displayName: string;
  isVerified: boolean;
  uuid: string;
  phone: string;
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
          email: data.email,
          avatar: data.photoURL,
          displayName: data.displayName,
          isVerified: data.emailVerified,
          uuid: data.uid,
          phone: data.phoneNumber,
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
    const docRef = doc(db, "users", user.uuid);
    await updateDoc(docRef, {
      is_verified: user.isVerified,
      user_avatar: user.avatar,
      user_updatedAT: serverTimestamp(),
      user_name: user.displayName,
      user_phone: user.phone,
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
