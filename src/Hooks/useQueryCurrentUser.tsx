import { authUser } from "../Config/FireBaseConfig";
import { db } from "../Config/FireBaseConfig";
import { getDoc, doc, collection } from "firebase/firestore";
import { useQuery } from "react-query";
import { db_user_type } from "../Type/commonType";

export default function useQueryCurrentUser() {
  const userId = authUser.currentUser?.uid;
  const table = "users";
  return useQuery(
    "userData",
    async () => {
      // if (!userId) throw new Error("User id not found");
      const userRef = doc(collection(db, table), userId!);
      // if (!userId) throw new Error("User collection not found");
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        // console.log(data);
        return data as db_user_type;
      } else {
        // throw new Error("User not found");
      }
    },
    {
      ...Option,
      refetchOnWindowFocus: false,
      enabled: !!userId,
      staleTime: 1000 * 60 * 60,
      // onError(err) {
      //   console.log(err);
      // },
    }
  );
}
