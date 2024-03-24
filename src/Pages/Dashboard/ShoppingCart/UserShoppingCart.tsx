import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Helmet } from "react-helmet-async";
import QuantityBTN from "../../../Components/Buttons/QuantityBTN/QuantityBTN";
import { wishlistData } from "../Wishlist/wishListDB";

export default function UserShoppingCart() {
  // Pagination library start
  const [itemOffset, setItemOffset] = useState(0);
  let itemsPerPage = 7;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = wishlistData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(wishlistData.length / itemsPerPage);
  const handlePageClick = (e: any) => {
    const newOffset = (e.selected * itemsPerPage) % wishlistData.length;
    setItemOffset(newOffset);
  };
  // Pagination library end

  const renderWishlist = currentItems.map(product => {
    const [quantity, setQuantity] = useState(1);
    const [quantityModelOn, setQuantityModelOn] = useState(false);
    const { id, title, price, imgUrl } = product;

    const formatCurrency = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
    return (
      <tr key={id}>
        <td>
          <div className="item-title">
            <img src={imgUrl} alt={title} />
            <h3>{title}</h3>
          </div>
        </td>
        <td>
          <div className="price">{formatCurrency.format(price)}</div>
        </td>
        <td>
          <div className="quantity">
            {quantityModelOn ? (
              <div
                onClick={() => {
                  setQuantityModelOn(false);
                }}
                className="quantity-model"
              >
                <QuantityBTN
                  least={1} // least to buy in one time
                  most={10} // most to buy in one time
                  stockQuantity={20} // quntity in stock db
                  defaultQuantity={1} // input value
                  containerClass="quantity-container"
                  quantityBTNSClass="quantity-btns"
                  errorMsgClass="quantity-error"
                  setQuantity={setQuantity}
                />
              </div>
            ) : (
              ""
            )}
            <p
              className="quantity-model-btn"
              onClick={() => setQuantityModelOn(!quantityModelOn)}
            >
              {quantity === 1 ? "+" : quantity}
            </p>
          </div>
        </td>
        <td>
          <div className="subtotal">
            <p>{formatCurrency.format(price * quantity)}</p>
          </div>
        </td>
        <td>
          <div className="remove">-</div>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Helmet>
        <title>Green Store - Shopping Cart</title>
      </Helmet>
      <section className="shopping-cart-page">
        <h3 className="shopping-cart-page-title">Shopping Cart</h3>

        <div className="cart-bill-container">
          <div className="cart-bill">
            <div className="cart-bill-title">
              <h3>Cart Total</h3>
            </div>
            <div className="sub-total">
              <p>Subtotal</p>
              <p>$ 0.00</p>
            </div>

            <div className="shipping">
              <p>Shipping</p>
              <p>$ 0.00</p>
            </div>

            <div className="total">
              <p>Total</p>
              <p>$ 0.00</p>
            </div>

            <div className="checkout">
              <button>Proceed to checkout</button>
            </div>
          </div>
        </div>
        <table className="shopping-cart-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Q</th>
              <th> Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{renderWishlist}</tbody>
        </table>

        <div className="shopping-cart-pagination-comp">
          <ReactPaginate
            // onClick={() => window.scrollTo({ top: 160, behavior: "instant" })}
            className="shopping-cart-pagination"
            pageClassName="page-li"
            activeClassName="page-active"
            activeLinkClassName="page-active-link"
            nextLinkClassName="page-next"
            previousLinkClassName="page-prev"
            pageCount={pageCount}
            pageRangeDisplayed={1}
            marginPagesDisplayed={1}
            onPageChange={handlePageClick}
            // forcePage={0}
            breakLabel="..."
            nextLabel=" >"
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        </div>
      </section>
    </>
  );
}
