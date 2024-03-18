import React from "react";
import ReactDOM from "react-dom/client";
import MainLayout from "./MainLayout.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LocalContextProvider from "./Providers/LocalContextProvider.tsx";
import LocalHelmetProvider from "./Providers/LocalHelmetProvider.tsx";
import HomePage from "./Pages/Home/HomePage";
import ShopLayout from "./Layout/ShopLayout/ShopLayout";
import ShopPage from "./Pages/ShopPage/ShopPage";
import SigninPage from "./Pages/auth/Signin/Signin.tsx";
import SignupPage from "./Pages/auth/Signup/Signup.tsx";
import Cat from "./Pages/ShopPage/Category/Cat";
import VerfiyEmailPage from "./Pages/auth/Verfiy/VerfiyEmail.tsx";
import VerifiedDonePage from "./Pages/auth/Verified/VerifiedDone.tsx";
import ErrorPage from "./Pages/Error/ErrorPage.tsx";

import { Suspense } from "react";
import Loader from "./Components/Loader/Loader";

import { GreenContext } from "./Providers/LocalContextProvider.tsx";
import { useContext } from "react";
import { localContextType } from "./Providers/LocalContextProvider.tsx";
import { Navigate } from "react-router-dom";

export default function Red({ children }: { children: React.ReactNode }) {
  const { state } = useContext(GreenContext) as localContextType;
  const { cusrrentUser } = state;

  return cusrrentUser ? <Navigate to="/" /> : children;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "shop",
        element: <ShopLayout />,
        children: [
          {
            index: true,
            element: <ShopPage />,
          },
          {
            path: ":cat",
            element: <Cat />,
          },
        ],
      },

      {
        path: "auth/sign-in",
        element: (
          <Red>
            <SigninPage />
          </Red>
        ),
      },
      {
        path: "auth/sign-up",
        element: (
          <Red>
            <SignupPage />
          </Red>
        ),
      },

      {
        path: "auth/verify-email",
        element: <VerfiyEmailPage />,
      },
      {
        path: "auth/verified",
        element: <VerifiedDonePage />,
      },

      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LocalContextProvider>
      <LocalHelmetProvider>
        <RouterProvider router={router} />
      </LocalHelmetProvider>
    </LocalContextProvider>
  </React.StrictMode>
);
