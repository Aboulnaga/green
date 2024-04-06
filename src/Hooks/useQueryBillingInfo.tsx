import { useQuery } from "react-query";
import { getDoc, doc, collection } from "firebase/firestore";
import { db } from "../Config/FireBaseConfig";
import { billing_info_type } from "../Type/commonType";

export default function useQueryBillingInfo(userId: string) {
  return useQuery(
    "billingInfo",
    async () => {
      try {
        const userRef = doc(collection(db, "billing_info"), userId);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          // console.log(data);
          return data as billing_info_type;
        }
      } catch {
        throw new Error("billing info not found");
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
