import { Link } from "react-router-dom";
export default function MainHeader() {
  return (
    <div className="main-header-container">
      <div className="main-header fix-width center">
        <div className="main-header__col1">
          <Link to="/" title="Green store logo">
            <div className="main-header__col1__flex">
              <div className="main-header__col1__logo-icon">
                <img
                  loading="eager"
                  src="/img/icons/favicon.png"
                  title="green store logo"
                  alt="green store logo"
                />
              </div>
              <div className="main-header__col1__logo-text">
                <h1>Green</h1>
              </div>
            </div>
          </Link>
        </div>

        <div className="main-header__col2">
          <form>
            <div className="main-header__col2__icon">
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Search">
                  <g id="Group">
                    <path
                      id="Vector"
                      d="M9.16667 16.3333C12.8486 16.3333 15.8333 13.3486 15.8333 9.66667C15.8333 5.98477 12.8486 3 9.16667 3C5.48477 3 2.5 5.98477 2.5 9.66667C2.5 13.3486 5.48477 16.3333 9.16667 16.3333Z"
                      stroke="#1A1A1A"
                    />
                    <path
                      id="Vector_2"
                      d="M17.4999 18L13.8749 14.375"
                      stroke="#1A1A1A"
                    />
                  </g>
                </g>
              </svg>
            </div>

            <div className="main-header__col2__input">
              <input type="search" placeholder="search" />
            </div>
            <div className="main-header__col2__btn">
              <button type="submit">Search</button>
            </div>
          </form>
        </div>
        <div className="main-header__col3">
          <div className="main-header__col3__fav__icon">
            <svg
              width="32"
              height="33"
              viewBox="0 0 32 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Heart">
                <path
                  id="Vector"
                  d="M15.9995 28.5722C-10.6667 13.8333 7.99999 -2.16666 15.9995 7.95075C24 -2.16666 42.6666 13.8333 15.9995 28.5722Z"
                  stroke="#1A1A1A"
                />
              </g>
            </svg>
          </div>
          <div className="main-header__col3__cart__line"></div>

          <div className="main-header__col3__cart">
            <div className="main-header__col3__cart__icon">
              <svg
                width="34"
                height="35"
                viewBox="0 0 34 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Bag">
                  <path
                    id="Rectangle"
                    d="M11.3333 14.6667H7.08333L4.25 30.25H29.75L26.9167 14.6667H22.6667M11.3333 14.6667V10.4167C11.3333 7.28705 13.8704 4.75 17 4.75V4.75C20.1296 4.75 22.6667 7.28705 22.6667 10.4167V14.6667M11.3333 14.6667H22.6667M11.3333 14.6667V18.9167M22.6667 14.6667V18.9167"
                    stroke="#1A1A1A"
                  />
                </g>
              </svg>
            </div>
            <div className="main-header__col3__cart__txt">
              <h3 className="title">Shopping cart:</h3>
              <h3 className="price">$ 70.00</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
