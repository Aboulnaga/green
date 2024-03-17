import { Link } from "react-router-dom";
import { authUser } from "../../../Config/FireBaseConfig";
// console.log(authUser.currentUser);

export default function TopHeader() {
  return (
    <div className="top-header-container">
      <div className="top-header fix-width center">
        <div>
          <p>
            {JSON.stringify(authUser.currentUser?.emailVerified?.toString())}
          </p>
          <p>{JSON.stringify(authUser.currentUser?.email)}</p>
        </div>
        <div className="top-header__col1">
          <div className="top-header__col1__location-icon">
            <svg
              width="17"
              height="20"
              viewBox="0 0 17 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Map Pin">
                <path
                  id="Vector"
                  d="M16 8.36364C16 14.0909 8.5 19 8.5 19C8.5 19 1 14.0909 1 8.36364C1 6.41068 1.79018 4.53771 3.1967 3.15676C4.60322 1.77581 6.51088 1 8.5 1C10.4891 1 12.3968 1.77581 13.8033 3.15676C15.2098 4.53771 16 6.41068 16 8.36364Z"
                  //   stroke="#666666"
                />
                <path
                  id="Vector_2"
                  d="M8.5 10.8182C9.88071 10.8182 11 9.71925 11 8.36364C11 7.00803 9.88071 5.90909 8.5 5.90909C7.11929 5.90909 6 7.00803 6 8.36364C6 9.71925 7.11929 10.8182 8.5 10.8182Z"
                  //   stroke="#666666"
                />
              </g>
            </svg>
          </div>
          <div className="top-header__col1__location">
            <p>
              Store Location: Muhammed Nageb - 344, Sidi Beshr, Alex, Egypt.
            </p>
          </div>
        </div>
        <div className="top-header__col2">
          <div className="top-header__col2__curr">
            <select>
              <option value="egp">EGP</option>
              <option value="usd">USD</option>
            </select>
          </div>
          <div className="top-header__col2__log">
            <Link to="/auth/sign-in"> Sign in</Link>
            <span></span>
            <Link to="/auth/sign-up">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
