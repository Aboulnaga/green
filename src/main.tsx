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
import { Navigate } from "react-router-dom";
import useCurrentUser from "./Hooks/useCurrentUser.tsx";

const ProtectChild = ({
  children,
  url,
}: {
  children: React.ReactNode;
  url: string;
}) => {
  const currentUser = useCurrentUser();
  return currentUser ? <Navigate to={url} /> : children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
          <ProtectChild url="/">
            <SigninPage />
          </ProtectChild>
        ),
      },
      {
        path: "auth/sign-up",
        element: (
          <ProtectChild url="/">
            <SignupPage />
          </ProtectChild>
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
