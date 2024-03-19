import { Outlet } from "react-router-dom";
import BreadCrumbsComp from "../../Components/BreadCrumbs/BreadCrumbs";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

type BreadCompsType = {
  title: string;
  url: string;
}[];

export default function UserDahsboardLayout() {
  const { pathname } = useLocation();

  const BreadCompsComp = () => {
    let path;
    const baseDashboardUrl = "/u/dashboard/";

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
          { title: urlPath, url: pathname },
        ];
      } else {
        const splitBySlash = pathname.split("/")[3];
        // console.log(splitBySlash);
        const upperFirstLetter =
          [...splitBySlash][0].toUpperCase() +
          [...splitBySlash].slice(1).join("");
        return [
          { title: "Dashboard", url: baseDashboardUrl },
          { title: upperFirstLetter, url: pathname },
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
              <NavLink to="/u/dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/u/dashboard/order-history">Order History</NavLink>
            </li>
            <li>
              <NavLink to="/u/dashboard/wishlist">Wishlist</NavLink>
            </li>
            <li>
              <NavLink to="/u/dashboard/shopping-cart">Shopping Cart</NavLink>
            </li>
            <li>
              <NavLink to="/u/dashboard/settings">Settings</NavLink>
            </li>
          </ul>
        </aside>
        <main>
          <h2>dashboard</h2>
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
