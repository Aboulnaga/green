import useQueryCurrentUser from "./useQueryCurrentUser";
type statusType = {
  status: "idle" | "loading" | "error" | "refetching" | "success" | "noUser";
  message: string;
};

import { authUser } from "../Config/FireBaseConfig";

export default function useIsUserDataLoaded() {
  const { status, refetch, error } = useQueryCurrentUser();
  // console.log(status);
  //   console.log(error == "Error: User not found");
  if (status === "idle") {
    refetch();
    return {
      status: "refetching",
      message: "refetching data ...",
    } as statusType;
  }
  if (status === "loading") {
    return { status: "loading", message: "loading data ..." } as statusType;
  }
  if (status === "success") {
    return { status: "success", message: "success data" } as statusType;
  }
  //   console.log(error);
  //   console.log(error);
  if (!authUser.currentUser) {
    return { status: "noUser", message: "no user" } as statusType;
  }

  if (status === "error") {
    return { status: "error", message: error } as statusType;
  }
}
