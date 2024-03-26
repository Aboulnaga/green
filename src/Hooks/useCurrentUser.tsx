import { useMemo, useState, useEffect, useContext } from "react";
import { authUser, db } from "../Config/FireBaseConfig";
import { collection, doc, getDoc } from "firebase/firestore";
import { GreenContext } from "../Providers/LocalContextProvider";
import { localContextType } from "../Providers/LocalContextProvider";

export type useCurrentUserType = {
  user_email: string;
  is_verified: boolean;
  user_id: string;
  user_avatar?: string;
  user_name?: string;
  user_role: "customer" | "vip" | "editor" | "admin" | "owner";
  user_updatedAT: Date;
  user_firstName?: string;
  user_lastName?: string;
  user_phone?: string;
};

export default function useCurrentUser() {
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<useCurrentUserType | null>(null);
  const { dispatch } = useContext(GreenContext) as localContextType;

  // console.log(firebaseUser.uid);

  const memoUserID = useMemo(() => {
    authUser.currentUser && setUserId(authUser.currentUser.uid);
  }, [authUser.currentUser]);

  const getUserDataFromDB = async () => {
    try {
      const usersCollection = collection(db, "users");
      const docRef = doc(usersCollection, userId as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data() as useCurrentUserType);
      }
    } catch (err) {
      // console.log(err);
      // throw new Error("user not found");
    }
  };

  useEffect(() => {
    memoUserID;
    getUserDataFromDB();
    dispatch({ currentUser: userData });
  }, [authUser.currentUser?.uid]);

  return userData as useCurrentUserType;
}
