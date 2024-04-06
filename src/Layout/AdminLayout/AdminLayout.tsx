import { Outlet } from "react-router-dom";
import AdminHeader from "../../Components/AdminComonents/AdminHeader/AdminHeader";
import AdminFooter from "../../Components/AdminComonents/AdminFooter/AdminFooter";
import AdminSideMenu from "../../Components/AdminComonents/AdminSideMenu/AdminSideMenu";
import { Helmet } from "react-helmet-async";
import { GreenContext } from "../../Providers/LocalContextProvider";
import { useContext } from "react";
import { localContextType } from "../../Providers/LocalContextProvider";

export default function AdminLayout() {
  // console.log(checkData?.status);
  const { state } = useContext(GreenContext) as localContextType;
  const isAdminMenuOpen = state.isAdminMenuOpen;
  return (
    <>
      <Helmet>
        <title>Green - Management Panel </title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="admin-layout-container">
        <AdminHeader />

        <div className="admin-layout-main  admin-fixed admin-center">
          {isAdminMenuOpen ? (
            <aside>
              <AdminSideMenu />
            </aside>
          ) : null}
          <main>
            <Outlet />
          </main>
        </div>

        <AdminFooter />
      </div>
    </>
  );
}
