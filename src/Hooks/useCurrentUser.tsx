import { useMemo, useState, useEffect } from "react";
import { db } from "../Config/FireBaseConfig";
import { collection, doc, getDoc } from "firebase/firestore";
import { db_user_type } from "../Type/commonType";
import { authUser } from "../Config/FireBaseConfig";

export default function useCurrentUser() {
  const userId = authUser.currentUser?.uid;
  if (!userId) return null;
  const [userData, setUserData] = useState<db_user_type>();
  const getCurrentUserDataFromDB = async () => {
    const userRef = doc(collection(db, "users"), userId!);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setUserData(data as db_user_type);
    } else {
      throw new Error("User not found");
    }
  };
  const memoCurrentUser = useMemo(() => getCurrentUserDataFromDB(), [userId]);

  useEffect(() => {
    memoCurrentUser;
  }, []);
  // console.log(userId);
  console.log("userData", userData);

  // console.log("userData", userData);
  // console.log("userId", userId);
  // console.log("memoizedUserData", memoizedUserData);
  // console.log("memoizedUserId", memoizedUserId);

  return userData;
}
