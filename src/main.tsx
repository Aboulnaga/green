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
import UserDahsboardLayout from "./Layout/UserDashboardLayout/UserDahsboardLayout.tsx";
import UserDashboardPage from "./Pages/Dashboard/UserDashboard/UserDashboardPage.tsx";
import OrderHistory from "./Pages/Dashboard/OrderHistory/OrderHistory.tsx";
import UserWishlist from "./Pages/Dashboard/Wishlist/UserWishlist.tsx";
import UserShoppingCart from "./Pages/Dashboard/ShoppingCart/UserShoppingCart.tsx";
import UserSettings from "./Pages/Dashboard/Settings/UserSettings.tsx";
import OrderDetailsPage from "./Pages/Dashboard/OrderDetails/OrderDetailsPage.tsx";
import TermsAndConditionPage from "./Pages/TermsAndCondition/TermsAndConditionPage.tsx";
import useCurrentUser from "./Hooks/useCurrentUser.tsx";

const ProtectChild = ({
  children,
  url,
  allowedForNotVerifiedUser = false,
}: {
  children: React.ReactNode;
  url: string;
  allowedForNotVerifiedUser: boolean;
}) => {
  const currentUser = useCurrentUser();
  // console.log(url);
  // console.log(currentUser);
  const currentUserIsVerified = currentUser?.is_verified;

  if (allowedForNotVerifiedUser && !currentUserIsVerified) {
    return <div>{children}</div>;
  }
  return <div>{!currentUser ? children : <Navigate to={url} />}</div>;
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
            path: "orders-history",
            element: <OrderHistory />,
          },
          { path: "orders-history/id/:id", element: <OrderDetailsPage /> },
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
          <ProtectChild allowedForNotVerifiedUser={false} url="/">
            <SigninPage />
          </ProtectChild>
        ),
      },
      {
        path: "auth/sign-up",
        element: (
          <ProtectChild allowedForNotVerifiedUser={false} url="/">
            <SignupPage />
          </ProtectChild>
        ),
      },

      {
        path: "auth/verify-email",
        element: (
          <ProtectChild allowedForNotVerifiedUser={true} url="/">
            <VerfiyEmailPage />
          </ProtectChild>
        ),
      },
      {
        path: "auth/verified",
        element: (
          <ProtectChild allowedForNotVerifiedUser={true} url="/">
            <VerifiedDonePage />
          </ProtectChild>
        ),
      },

      {
        path: "terms-and-conditions",
        element: <TermsAndConditionPage />,
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
