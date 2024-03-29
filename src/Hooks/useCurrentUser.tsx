// import { useMemo, useState, useEffect, useContext } from "react";
// import { db } from "../Config/FireBaseConfig";
// import { collection, doc, getDoc } from "firebase/firestore";
// export type useCurrentUserType = {
//   user_email: string;
//   is_verified: boolean;
//   user_id: string;
//   user_avatar?: string;
//   user_name?: string;
//   user_role: "customer" | "vip" | "editor" | "admin" | "owner";
//   user_updatedAT: Date;
//   user_firstName?: string;
//   user_lastName?: string;
//   user_phone?: string;
// } ;

// export default function useCurrentUser(authId: {
//   currentUser: { uid: string };
// }) {
//   const userId = authId.currentUser?.uid;
//   const [userData, setUserData] = useState<useCurrentUserType | null>(null);

//   const getCurrentUserDataFromDB = async () => {
//     const userRef = doc(collection(db, "users"), userId!);
//     const docSnap = await getDoc(userRef);
//     if (docSnap.exists()) {
//       const data = docSnap.data();
//       setUserData(data as useCurrentUserType);
//     } else {
//       setUserData(null);
//       throw new Error("User not found");
//     }
//   };
//   const memoCurrentUser = useMemo(() => getCurrentUserDataFromDB(), [userId]);

//   useEffect(() => {
//     memoCurrentUser;
//   }, []);
//   // console.log(userId);
//   console.log("userData", userData);

//   // console.log("userData", userData);
//   // console.log("userId", userId);
//   // console.log("memoizedUserData", memoizedUserData);
//   // console.log("memoizedUserId", memoizedUserId);

//   return userData;
// }
