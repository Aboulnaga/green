import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Helmet } from "react-helmet-async";
import CartBTN from "../../../Components/Buttons/CartBTN/CartBTN";
import InStockBTN from "../../../Components/Buttons/InStockBTN/InStockBTN";
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
    const { id, title, price, stock, imgUrl } = product;
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
          <div className="instock">
            {
              <InStockBTN
                hover={true}
                inStockClassContainer="in-stock-container"
                inStockClass="in-stock"
                status={stock}
              />
            }
          </div>
        </td>
        <td>
          <div className="cart-btn">
            <CartBTN />
          </div>
        </td>
        <td>
          <div className="remove">X</div>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Helmet>
        <title>Green Store - Wishlist</title>
      </Helmet>
      <section className="wishlist-page">
        <h3 className="wishlist-page-title">Wishlist</h3>
        <table className="wishlist-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Stock?</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{renderWishlist}</tbody>
        </table>

        <div className="wishlist-pagination-comp">
          <ReactPaginate
            // onClick={() => window.scrollTo({ top: 160, behavior: "instant" })}
            className="wishlist-pagination"
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
