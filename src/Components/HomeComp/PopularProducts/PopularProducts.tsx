import { Link } from "react-router-dom";
import { PopularProductsDB } from "../../../DB/PopularProductsDB";
import FavBTN from "../../Buttons/FavBTN/FavBTN";
import CartBTN from "../../Buttons/CartBTN/CartBTN";
import ViewBTN from "../../Buttons/ViewBTN/ViewBTN";
export default function PopularProducts() {
  const popularProductsMap = PopularProductsDB.map((product, i) => {
    const {
      name,
      rate,
      price,
      discountValue,
      discount: isDiscount,
      img,
    } = product;
    const url = product.name.split(" ").join("-").toLocaleLowerCase();
    const stars = "⭐".repeat(Math.floor(rate));
    const priceFormat = product.price.toLocaleString("en-us", {
      style: "currency",
      currency: "USD",
    });
    const disPrice = product.price - (price * discountValue) / 100;
    const disPriceFormat = disPrice.toLocaleString("en-us", {
      style: "currency",
      currency: "USD",
    });

    return (
      <div key={i} className="product-container">
        <div onClick={e => e.preventDefault()} className="top-box">
          <div className="top-box__row1">
            <div className="fav">
              <FavBTN />
            </div>
            <div className="view">
              <ViewBTN />
            </div>
          </div>
          <div className="top-box__row2">
            <div className="cart">
              <CartBTN />
            </div>
          </div>
        </div>
        <div className="product">
          <div className="img">
            <Link to={`/product/${product.id}/${url}`}>
              <img src={img} alt={name} />
            </Link>
          </div>
          <div className="info">
            <Link to={`/product/${product.id}/${url}`}>
              <h3>{name}</h3>
            </Link>
            <p>
              <span
                style={
                  isDiscount
                    ? {
                        color: "var(--grey400)",
                        textDecoration: "line-through",
                      }
                    : {}
                }
              >
                {priceFormat}
              </span>
              {isDiscount ? <span>{disPriceFormat}</span> : ""}
            </p>
            <span>{stars}</span>
          </div>
        </div>
      </div>
    );
  });

  return (
    <section className="popular-products-container">
      <div className="popular-products fix-width center">
        <header className="popular-products__header">
          <h3>Popular Products</h3>
          <Link to="/shop">
            View All{" "}
            <svg
              width="17"
              height="14"
              viewBox="0 0 17 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 7.00049H1"
                stroke="#00B307"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.94995 0.975464L16 6.99946L9.94995 13.0245"
                stroke="#00B307"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </header>

        <div className="products">{popularProductsMap}</div>
      </div>
    </section>
  );
}
