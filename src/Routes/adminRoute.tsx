import { lazy, Suspense } from "react";
import Loader from "../Components/Loader/Loader";
import AdminLayout from "../Layout/AdminLayout/AdminLayout";
import PrepareData from "./Shield/PrePareData";
import OnlyForAuthAndVerified from "./Shield/OnlyForAuthAndVerified";
const AdminStatusPage = lazy(
  () => import("../Pages/Admin/Status/AdminStatusPage")
);
export const adminRoute = [
  {
    path: "+/behind-the-scenes/",
    element: (
      <Suspense fallback={<Loader />}>
        <PrepareData>
          <OnlyForAuthAndVerified>
            <AdminLayout />
          </OnlyForAuthAndVerified>
        </PrepareData>
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <AdminStatusPage />
          </Suspense>
        ),
      },
    ],
  },
];
