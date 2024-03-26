import { Outlet } from "react-router-dom";
import BreadCrumbsComp from "../../Components/BreadCrumbs/BreadCrumbs";
import { useLocation, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  LogOutButtonComp,
  SettingsLinkComp,
  ShoppingCartLinkComp,
  WishlistLinkComp,
  DashboardLinkComp,
  OrderHistoryLinkComp,
} from "./NavLinksComp";
type BreadCompsType = {
  title: string;
  url: string;
}[];

export default function UserDahsboardLayout() {
  const { pathname } = useLocation();
  const { id: orderDetailesId } = useParams();
  // const onScrollHeight = 0;

  const BreadCompsComp = () => {
    let path;
    const baseDashboardUrl = "/u/dashboard/";
    // console.log(pathname);
    // console.log(baseDashboardUrl + "/id/:id");
    // console.log(orderDetailesId);

    if (orderDetailesId) {
      path = "Dashboard";
      return [
        { title: "Orders History", url: "/u/dashboard/orders-history/" },
        { title: "Order Details", url: pathname },
      ];
    }

    if (pathname === baseDashboardUrl || pathname === "/u/dashboard") {
      path = "Dashboard";
      return [{ title: path, url: pathname }];
    } else {
      const hasDash = pathname.includes("-");
      // console.log(hasDash);

      if (hasDash) {
        const splitBydash = pathname.split("-");
        const dashPart_1 = splitBydash[0].split("/")[3];
        const finshDashPart_1 =
          [...dashPart_1][0].toUpperCase() + [...dashPart_1].slice(1).join("");
        const dashPart_2 = splitBydash[1];
        const finshDashPart_2 =
          [...dashPart_2][0].toUpperCase() + [...dashPart_2].slice(1).join("");
        const urlPath = (path = finshDashPart_1 + " " + finshDashPart_2);
        return [
          { title: "Dashboard", url: baseDashboardUrl },
          { title: urlPath.replace(/[^a-zA-Z ]+/g, ""), url: pathname },
        ];
      } else {
        const splitBySlash = pathname.split("/")[3];
        // console.log(splitBySlash);
        const upperFirstLetter =
          [...splitBySlash][0].toUpperCase() +
          [...splitBySlash].slice(1).join("");
        return [
          { title: "Dashboard", url: baseDashboardUrl },
          {
            title: upperFirstLetter.replace(/[^a-zA-Z ]+/g, ""),
            url: pathname,
          },
        ];
      }
    }
  };

  return (
    <>
      <BreadCrumbsComp path={BreadCompsComp() as BreadCompsType} />
      <div className="dashboard-layout fix-width center">
        <aside>
          <ul>
            <li>
              <NavLink
                // onClick={() => {
                //   window.scrollTo({ top: onScrollHeight, behavior: "instant" });
                // }}
                end
                to="/u/dashboard/"
                title="Dashboard"
              >
                <DashboardLinkComp />
              </NavLink>
            </li>
            <li>
              <NavLink to="/u/dashboard/orders-history/" title="Order History">
                <OrderHistoryLinkComp />
              </NavLink>
            </li>
            <li>
              <NavLink end to="/u/dashboard/wishlist/" title="Wishlist">
                <WishlistLinkComp />
              </NavLink>
            </li>
            <li>
              <NavLink
                end
                to="/u/dashboard/shopping-cart/"
                title="Shopping Cart"
              >
                <ShoppingCartLinkComp />
              </NavLink>
            </li>
            <li>
              <NavLink end to="/u/dashboard/settings/" title="Settings">
                <SettingsLinkComp />
              </NavLink>
            </li>
            <li>
              <LogOutButtonComp />
            </li>
          </ul>
        </aside>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

/*

if (splitBydash.length > 1) {
        const splitBydash = pathname.split("-");
        const dashPart_1 = splitBydash[0].split("/")[3];
        const finshDashPart_1 =
          [...dashPart_1][0].toUpperCase() + [...dashPart_1].slice(1).join("");
        const dashPart_2 = splitBydash[1];
        const finshDashPart_2 =
          [...dashPart_2][0].toUpperCase() + [...dashPart_2].slice(1).join("");
        path = finshDashPart_1 + " " + finshDashPart_2;
      } else {
        const splitBySlash = pathname.split("/")[2];
        console.log(splitBySlash);
        const upperFirstLetter =
          [...splitBySlash][0].toUpperCase() +
          [...splitBySlash].slice(1).join("");
        path = upperFirstLetter;
      }

       console.log(path);
    console.log(pathname);
    if (pathname === "/u/dashboard") {
    
    } else {
      return [
        { title: "Dashboard", url: "/u/dashboard" },
        { title: path, url: pathname },
      ];
    }
  };

*/
