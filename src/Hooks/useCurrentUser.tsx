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
} | null;

export default function useCurrentUser() {
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<useCurrentUserType | null>(null);
  const { dispatch } = useContext(GreenContext) as localContextType;

  const memoizedUserData = useMemo(() => userData, [userData]);
  const memoizedUserId = useMemo(() => userId, [userId]);

  useEffect(() => {
    const unsubscribe = authUser.onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
        setUserData(null); // مسح البيانات عند تسجيل الخروج
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const getUserDataFromDB = async () => {
      if (memoizedUserId) {
        try {
          const usersCollection = collection(db, "users");
          const userDoc = doc(usersCollection, memoizedUserId);
          const userSnapshot = await getDoc(userDoc);

          if (userSnapshot.exists()) {
            setUserData(userSnapshot.data() as useCurrentUserType);
          } else {
            console.error("User document not found:", userId);
          }
        } catch (error) {
          console.error("User document not found:", userId);
        }
      }
    };

    getUserDataFromDB();
  }, [userId]);

  useEffect(() => {
    if (userData) {
      dispatch({ currentUser: userData });
    }
  }, [userData]);

  // console.log("userData", userData);
  // console.log("userId", userId);
  // console.log("memoizedUserData", memoizedUserData);
  // console.log("memoizedUserId", memoizedUserId);

  return memoizedUserData;
}
