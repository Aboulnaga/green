import { lazy } from "react";
// const ShopLayout = lazy(() => import("../Layout/ShopLayout/ShopLayout"));
import ShopLayout from "../Layout/ShopLayout/ShopLayout";
import PrepareData from "./Shield/PrePareData";
const ShopPage = lazy(() => import("../Pages/ShopPage/ShopPage"));
const Cat = lazy(() => import("../Pages/ShopPage/Category/Cat"));
import { Suspense } from "react";
import Loader from "../Components/Loader/Loader";
export const ShopRoute = [
  {
    path: "/shop",
    element: (
      <Suspense fallback={<Loader />}>
        <PrepareData>
          <ShopLayout />
        </PrepareData>
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <ShopPage />
          </Suspense>
        ),
      },
      {
        path: ":cat",
        element: (
          <Suspense fallback={<Loader />}>
            <Cat />
          </Suspense>
        ),
      },
    ],
  },
];
