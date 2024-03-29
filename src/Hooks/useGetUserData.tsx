import { getDoc, doc } from "firebase/firestore";
import { db } from "../Config/FireBaseConfig";
import { db_user_type } from "../Type/commonType";
export default function useGetUserData(id: string) {
  const getUserData = async () => {
    const dbData = await getDoc(doc(db, "users", id as string));
    if (dbData.exists()) {
      const userData = dbData.data() as db_user_type;
      return userData;
    } else {
      throw new Error("user not found");
    }
  };

  return getUserData() as Promise<db_user_type>;
}
