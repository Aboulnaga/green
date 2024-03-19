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
import UserDahsboardLayout from "./Layout/UserDashboardLayout/UserDahsboardLayout.tsx";
import UserDashboardPage from "./Pages/Dashboard/UserDashboard/UserDashboardPage.tsx";
import OrderHistory from "./Pages/Dashboard/OrderHistory/OrderHistory.tsx";
import UserWishlist from "./Pages/Dashboard/Wishlist/UserWishlist.tsx";
import UserShoppingCart from "./Pages/Dashboard/ShoppingCart/UserShoppingCart.tsx";
import UserSettings from "./Pages/Dashboard/Settings/UserSettings.tsx";
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
        path: "u/dashboard",

        element: <UserDahsboardLayout />,
        children: [
          {
            index: true,
            element: <UserDashboardPage />,
          },
          {
            path: "order-history",
            element: <OrderHistory />,
          },
          {
            path: "wishlist",
            element: <UserWishlist />,
          },
          {
            path: "shopping-cart",
            element: <UserShoppingCart />,
          },
          {
            path: "settings",
            element: <UserSettings />,
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
        element: (
          <ProtectChild url="/">
            <VerfiyEmailPage />
          </ProtectChild>
        ),
      },
      {
        path: "auth/verified",
        element: (
          <ProtectChild url="/">
            <VerifiedDonePage />
          </ProtectChild>
        ),
      },

      {
        path: "error",
        element: <ErrorPage />,
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
