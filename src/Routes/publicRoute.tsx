import { lazy } from "react";
import { Suspense } from "react";
import PrepareData from "./Shield/PrePareData";
import Loader from "../Components/Loader/Loader";
import MainLayout from "../MainLayout.tsx";
const HomePage = lazy(() => import("../Pages/Home/HomePage"));
const SigninPage = lazy(() => import("../Pages/auth/Signin/Signin.tsx"));
const SignupPage = lazy(() => import("../Pages/auth/Signup/Signup.tsx"));
const VerfiyEmailPage = lazy(
  () => import("../Pages/auth/Verfiy/VerfiyEmail.tsx")
);
const VerifiedDonePage = lazy(
  () => import("../Pages/auth/Verified/VerifiedDone.tsx")
);
const TermsAndConditionPage = lazy(
  () => import("../Pages/TermsAndCondition/TermsAndConditionPage.tsx")
);

export const publicRoute = [
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <PrepareData>{<MainLayout />}</PrepareData>
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <HomePage />
          </Suspense>
        ),
      },

      {
        path: "auth/sign-in",
        element: (
          <Suspense fallback={<Loader />}>
            <SigninPage />
          </Suspense>
        ),
      },
      {
        path: "auth/sign-up",
        element: (
          <Suspense fallback={<Loader />}>
            <SignupPage />
          </Suspense>
        ),
      },

      {
        path: "auth/verify-email",
        element: (
          <Suspense fallback={<Loader />}>
            <VerfiyEmailPage />
          </Suspense>
        ),
      },
      {
        path: "auth/verified",
        element: (
          <Suspense fallback={<Loader />}>
            <VerifiedDonePage />
          </Suspense>
        ),
      },

      {
        path: "terms-and-conditions",
        element: (
          <Suspense fallback={<Loader />}>
            <TermsAndConditionPage />
          </Suspense>
        ),
      },
    ],
  },
];
