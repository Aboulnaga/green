import { lazy } from "react";
import PrepareData from "./Shield/PrePareData";
import { Suspense } from "react";
import UserDahsboardLayout from "../Layout/UserDashboardLayout/UserDahsboardLayout";
import Loader from "../Components/Loader/Loader";
const UserDashboardPage = lazy(
  () => import("../Pages/Dashboard/UserDashboard/UserDashboardPage")
);
const OrderHistory = lazy(
  () => import("../Pages/Dashboard/OrderHistory/OrderHistory")
);
const UserWishlist = lazy(
  () => import("../Pages/Dashboard/Wishlist/UserWishlist")
);
const UserShoppingCart = lazy(
  () => import("../Pages/Dashboard/ShoppingCart/UserShoppingCart")
);
const UserSettings = lazy(
  () => import("../Pages/Dashboard/Settings/UserSettings")
);
const OrderDetailsPage = lazy(
  () => import("../Pages/Dashboard/OrderDetails/OrderDetailsPage")
);
import OnlyForAuthAndVerified from "./Shield/OnlyForAuthAndVerified";

export const dashboardRoute = [
  {
    path: "u/dashboard",

    element: (
      <Suspense fallback={<Loader />}>
        <PrepareData>
          <OnlyForAuthAndVerified>
            <UserDahsboardLayout />
          </OnlyForAuthAndVerified>
        </PrepareData>
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <UserDashboardPage />
          </Suspense>
        ),
      },
      {
        path: "orders-history",
        element: (
          <Suspense fallback={<Loader />}>
            <OrderHistory />
          </Suspense>
        ),
      },
      {
        path: "orders-history/id/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <OrderDetailsPage />
          </Suspense>
        ),
      },
      {
        path: "wishlist",
        element: (
          <Suspense fallback={<Loader />}>
            <UserWishlist />
          </Suspense>
        ),
      },
      {
        path: "shopping-cart",
        element: (
          <Suspense fallback={<Loader />}>
            <UserShoppingCart />
          </Suspense>
        ),
      },
      {
        path: "settings",
        element: (
          <Suspense fallback={<Loader />}>
            <UserSettings />
          </Suspense>
        ),
      },
    ],
  },
];
