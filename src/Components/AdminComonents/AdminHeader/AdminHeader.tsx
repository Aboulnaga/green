import { Link } from "react-router-dom";
import { burgerMenuIcon, logoIcon } from "../../SVG/SVG";
import UserInfo from "../../Header/UserInfo/UserInfo";
import { GreenContext } from "../../../Providers/LocalContextProvider";
import { useContext } from "react";
import { localContextType } from "../../../Providers/LocalContextProvider";
export default function AdminHeader() {
  const { state, dispatch } = useContext(GreenContext) as localContextType;

  return (
    <header className="admin-header">
      <div className="admin-header-container admin-fixed admin-center">
        <div className="logo">
          <div
            className="burger-menu"
            onClick={() =>
              dispatch({ isAdminMenuOpen: !state.isAdminMenuOpen })
            }
          >
            {burgerMenuIcon}
          </div>
          <h1>
            <Link to="/">
              <span>{logoIcon}</span>Green
            </Link>
          </h1>
        </div>

        <nav>
          <ul>
            <li className="user-data">{<UserInfo />}</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
