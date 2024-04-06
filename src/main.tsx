import React, { lazy, Suspense } from "react";
import Loader from "./Components/Loader/Loader.tsx";
import ReactDOM from "react-dom/client";
import MainLayout from "./MainLayout.tsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import LocalContextProvider from "./Providers/LocalContextProvider.tsx";
import LocalHelmetProvider from "./Providers/LocalHelmetProvider.tsx";
import UseQueryProvider from "./Providers/UseQueryProvider.tsx";
const HomePage = lazy(() => import("./Pages/Home/HomePage"));
const ShopLayout = lazy(() => import("./Layout/ShopLayout/ShopLayout"));
const ShopPage = lazy(() => import("./Pages/ShopPage/ShopPage"));
const SigninPage = lazy(() => import("./Pages/auth/Signin/Signin.tsx"));
const SignupPage = lazy(() => import("./Pages/auth/Signup/Signup.tsx"));
const Cat = lazy(() => import("./Pages/ShopPage/Category/Cat"));
const VerfiyEmailPage = lazy(
  () => import("./Pages/auth/Verfiy/VerfiyEmail.tsx")
);
const VerifiedDonePage = lazy(
  () => import("./Pages/auth/Verified/VerifiedDone.tsx")
);
const ErrorPage = lazy(() => import("./Pages/Error/ErrorPage.tsx"));
// const UserDahsboardLayout = lazy(
//   () => import("./Layout/UserDashboardLayout/UserDahsboardLayout.tsx")
// );
import UserDahsboardLayout from "./Layout/UserDashboardLayout/UserDahsboardLayout.tsx";
const UserDashboardPage = lazy(
  () => import("./Pages/Dashboard/UserDashboard/UserDashboardPage.tsx")
);
const OrderHistory = lazy(
  () => import("./Pages/Dashboard/OrderHistory/OrderHistory.tsx")
);
const UserWishlist = lazy(
  () => import("./Pages/Dashboard/Wishlist/UserWishlist.tsx")
);
const UserShoppingCart = lazy(
  () => import("./Pages/Dashboard/ShoppingCart/UserShoppingCart.tsx")
);
const UserSettings = lazy(
  () => import("./Pages/Dashboard/Settings/UserSettings.tsx")
);
const OrderDetailsPage = lazy(
  () => import("./Pages/Dashboard/OrderDetails/OrderDetailsPage.tsx")
);
const TermsAndConditionPage = lazy(
  () => import("./Pages/TermsAndCondition/TermsAndConditionPage.tsx")
);

const AdminLayout = lazy(() => import("./Layout/AdminLayout/AdminLayout.tsx"));

const AdminStatusPage = lazy(
  () => import("./Pages/Admin/Status/AdminStatusPage.tsx")
);

import useQueryCurrentUser from "./Hooks/useQueryCurrentUser.tsx";
import useIsUserDataLoaded from "./Hooks/useIsUserDataLoaded.tsx";
import toast from "react-hot-toast";
import ErrorsLayout from "./Layout/ErrorsLayout/ErrorsLayout.tsx";

const PrepareDataBeforeLoadingComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const checkData = useIsUserDataLoaded();
  console.log(checkData?.status);
  // console.log(checkData?.status);
  if (checkData?.status === "loading") return <Loader />;
  if (checkData?.status === "error") {
    return (
      <Navigate
        to={`/error?status=error&message=${checkData?.message}&path=${window.location.pathname} `}
        replace={true}
        state={checkData?.message}
      />
    );
  }

  return <>{children}</>;
};

const ProtectDashboard = ({ children }: { children: React.ReactNode }) => {
  const { data: currentUser } = useQueryCurrentUser();
  const isVerified = currentUser?.is_verified;

  return (
    <>
      {isVerified ? (
        children
      ) : (
        <div>
          <p> Private area </p>
        </div>
      )}
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrepareDataBeforeLoadingComponent>
        <Suspense fallback={<Loader />}>{<MainLayout />}</Suspense>,
      </PrepareDataBeforeLoadingComponent>
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
        path: "shop",
        element: (
          <Suspense fallback={<Loader />}>
            <ShopLayout />
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

  {
    path: "u/dashboard",

    element: (
      <Suspense fallback={<Loader />}>
        <PrepareDataBeforeLoadingComponent>
          <ProtectDashboard>
            <UserDahsboardLayout />
          </ProtectDashboard>
        </PrepareDataBeforeLoadingComponent>
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

  {
    path: "+/behind-the-scenes/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <PrepareDataBeforeLoadingComponent>
          <ProtectDashboard>
            <AdminLayout />
          </ProtectDashboard>
        </PrepareDataBeforeLoadingComponent>
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminStatusPage />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "*",
    element: (
      <Suspense fallback={<Loader />}>
        <PrepareDataBeforeLoadingComponent>
          <ErrorsLayout />
        </PrepareDataBeforeLoadingComponent>
      </Suspense>
    ),

    children: [
      {
        path: "error",
        element: (
          <Suspense fallback={<Loader />}>
            <ErrorPage />
          </Suspense>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LocalContextProvider>
      <UseQueryProvider>
        <LocalHelmetProvider>
          <RouterProvider router={router} />
        </LocalHelmetProvider>
      </UseQueryProvider>
    </LocalContextProvider>
  </React.StrictMode>
);
