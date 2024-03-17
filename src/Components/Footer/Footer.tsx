import { Link, NavLink } from "react-router-dom";
import {
  FacebookBTN,
  TwitterBTN,
  PinterestBTN,
  InstaBTN,
} from "../Buttons/SocialBTN/SocialBTN";

export default function Footer() {
  return (
    <div className="all-foter">
      <section className="newsletter-container">
        <div className="newsletter fix-width center">
          <div className="newsletter__col1">
            <h3>Sign up for newsletter</h3>
            <p>
              Pellentesque eu nibh eget mauris congue mattis mattis nec tellus.
              Phasellus imperdiet elit eu magna.
            </p>
          </div>
          <div className="newsletter__col2">
            <form>
              <input type="email" placeholder="Enter your email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
          <div className="newsletter__col3">
            <ul>
              <li>
                <Link to="#">
                  <FacebookBTN
                    containerClass="social-icon-container"
                    userClass="social-icon facebook"
                  />
                </Link>
              </li>
              <li>
                <Link to="#">
                  <TwitterBTN
                    containerClass="social-icon-container"
                    userClass="social-icon twitter"
                  />
                </Link>
              </li>
              <li>
                <Link to="#">
                  <PinterestBTN
                    containerClass="social-icon-container"
                    userClass="social-icon pinterest"
                  />
                </Link>
              </li>
              <li>
                <Link to="#">
                  <InstaBTN
                    containerClass="social-icon-container"
                    userClass="social-icon instagram"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="footer-conatiner">
        <div className="footer fix-width center">
          <div className="footer__row1">
            <div className="footer__row1__col1">
              <Link to="/" title="Green store logo">
                <img
                  loading="eager"
                  src="/img/icons/favicon.png"
                  title="green store logo"
                  alt="green store logo"
                />
                <h2>Green</h2>
              </Link>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Incidunt excepturi velit possimus numquam fuga!
              </p>
            </div>
            <div className="footer__row1__col2">
              <ul>
                <li>My Account</li>
                <li>
                  <NavLink to="/my-account">my account</NavLink>
                </li>
                <li>
                  <NavLink to="/login">orders history</NavLink>{" "}
                </li>
                <li>
                  <NavLink to="/shopping-cart">shopping cart</NavLink>
                </li>
                <li>
                  <NavLink to="/wishlist">wishlist</NavLink>
                </li>
              </ul>
            </div>
            <div className="footer__row1__col3">
              <ul>
                <li>Helps</li>
                <li>
                  <NavLink to="/contact-us">contact</NavLink>
                </li>
                <li>
                  <NavLink to="/faqs">Faqs</NavLink>
                </li>
                <li>
                  <NavLink to="/terms-and-conditions">
                    Terms & Conditions
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/privacy-policy">Privacy Policy</NavLink>
                </li>
              </ul>
            </div>
            <div className="footer__row1__col4">
              <ul>
                <li>Proxy Support</li>
                <li>
                  <NavLink to={"/about-us"}>About</NavLink>
                </li>
                <li>
                  <NavLink to={"/shop"}>shop</NavLink>
                </li>
                <li>
                  <NavLink to={"/product"}>product</NavLink>
                </li>
                <li>
                  <NavLink to={"/track-order"}>Track Order</NavLink>
                </li>
              </ul>
            </div>
            <div className="footer__row1__col5">
              <ul>
                <li>Categories</li>
                <li>
                  <NavLink to={"/shop/fruits"}>Fruits</NavLink>{" "}
                </li>
                <li>
                  <NavLink to={"/shop/vegetables"}>Vegetables</NavLink>
                </li>
                <li>
                  <NavLink to={"/shop/meat-and-fish"}>Meat & Fish</NavLink>
                </li>
                <li>
                  <NavLink to={"/shop/beauty-and-health"}>
                    Beauty & Health
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer__row2">
            <div className="footer__row2__col1">
              <p>Green eCommerce © 2021. All Rights Reserved</p>
            </div>
            <div className="footer__row2__col2">
              <Link to="#">
                <img src="/img/pages/home/ebay.png" alt=" ebay" />
              </Link>

              <Link to="#">
                <img src="/img/pages/home/visa.png" alt="visa" />
              </Link>

              <Link to={"#"}>
                <img src="/img/pages/home/discover.png" alt="discover" />
              </Link>

              <Link to="#">
                <img src="/img/pages/home/mastercard.png" alt="mastercard" />
              </Link>

              <Link to="#">
                <img src="/img/pages/home/secure.png" alt="secure" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
