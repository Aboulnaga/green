import { createContext, useReducer } from "react";
import CategoriesDB from "../DB/CategoriesDB";
export type localContextType = {
  state: {
    CategoriesDB: {
      cat_id: number;
      cat_name: string;
      cat_img: string;
      isPopular: boolean;
    }[];
    currentUser: {
      uuid: string;
      email: string;
      isVerified: boolean;
      displayName?: string | null;
      avatar?: string;
    } | null;
    isAdminMenuOpen: boolean;
  };
  action: any;
  dispatch: React.Dispatch<any>;
};
export const GreenContext = createContext<localContextType | {}>({});

export default function LocalContextProvider({ children }: any) {
  const [state, dispatch] = useReducer(
    (state: localContextType, action: any) => ({
      ...state,
      ...action,
    }),
    {
      CategoriesDB,
      isAdminMenuOpen: false,
    }
  );

  return (
    <GreenContext.Provider value={{ state, dispatch }}>
      {children}
    </GreenContext.Provider>
  );
}
