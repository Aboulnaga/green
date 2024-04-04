import { useQuery } from "react-query";
import { getDoc, doc, collection } from "firebase/firestore";
import { db } from "../Config/FireBaseConfig";
import { billing_info_type } from "../Type/commonType";

export default function useQueryBillingInfo(userId: string) {
  return useQuery(
    "billingInfo",
    async () => {
      const userRef = doc(collection(db, "billing_info"), userId);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        // console.log(data);
        return data as billing_info_type;
      } else {
        throw new Error("User not found");
      }
    },
    {
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
      enabled: !!userId,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );
}
