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
import UserDahsboardLayout from "./Layout/UserDashboardLayout/UserDahsboardLayout.tsx";
import UserDashboardPage from "./Pages/Dashboard/UserDashboard/UserDashboardPage.tsx";
import OrderHistory from "./Pages/Dashboard/OrderHistory/OrderHistory.tsx";
import UserWishlist from "./Pages/Dashboard/Wishlist/UserWishlist.tsx";
import UserShoppingCart from "./Pages/Dashboard/ShoppingCart/UserShoppingCart.tsx";
import UserSettings from "./Pages/Dashboard/Settings/UserSettings.tsx";
import OrderDetailsPage from "./Pages/Dashboard/OrderDetails/OrderDetailsPage.tsx";
import TermsAndConditionPage from "./Pages/TermsAndCondition/TermsAndConditionPage.tsx";

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
        element: <SigninPage />,
      },
      {
        path: "auth/sign-up",
        element: <SignupPage />,
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
