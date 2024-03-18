import { GreenContext } from "../Providers/LocalContextProvider";
import { useContext } from "react";
import { localContextType } from "../Providers/LocalContextProvider";

export type CusrrentUserType = {
  email: string;
  isVerified: boolean;
  uuid: string;
  avatar?: string;
  displayName?: string;
};

export default function useCurrentUser() {
  const { state } = useContext(GreenContext) as localContextType;
  const { cusrrentUser } = state;

  return cusrrentUser as CusrrentUserType;
}
