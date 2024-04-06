import { lazy, Suspense } from "react";
import ErrorsLayout from "../Layout/ErrorsLayout/ErrorsLayout";
import Loader from "../Components/Loader/Loader";
import PrepareData from "./Shield/PrePareData";

const ErrorPage = lazy(() => import("../Pages/Error/ErrorPage"));

export const errorsRoute = [
  {
    path: "/error",
    element: (
      <Suspense fallback={<Loader />}>
        <PrepareData>
          <ErrorsLayout />
        </PrepareData>
      </Suspense>
    ),

    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <ErrorPage />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "*",
    element: (
      <Suspense fallback={<Loader />}>
        <PrepareData>
          <div>
            <h2>this page not found</h2>
          </div>
        </PrepareData>
      </Suspense>
    ),
  },
];
