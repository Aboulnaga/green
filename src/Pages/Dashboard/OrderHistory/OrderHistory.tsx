import ReactPaginate from "react-paginate";
import { useState } from "react";
import { NavLink } from "react-router-dom";
type OrderType = {
  id: string;
  date: string;
  status: string;
  total: number;
  items: number;
}[];
export default function OrderHistory() {
  const orders = [
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#5678",
      date: "2022-01-01",
      status: "pending",
      total: 1000,
      items: 12,
    },
    {
      id: "#9101",
      date: "2022-01-01",
      status: "delivered",
      total: 380,
      items: 5,
    },
    {
      id: "#1112",
      date: "2022-01-01",
      status: "pending",
      total: 30,
      items: 2,
    },
    {
      id: "#1314",
      date: "2022-01-01",
      status: "pending",
      total: 450,
      items: 5,
    },
    {
      id: "#1516",
      date: "2024-01-01",
      status: "delivered",
      total: 10,
      items: 1,
    },
    {
      id: "#1617",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 3,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
    {
      id: "#1234",
      date: "2022-01-01",
      status: "pending",
      total: 100,
      items: 10,
    },
  ] as OrderType;

  const mapOrders = orders.map((order, i) => {
    return (
      <tr key={i}>
        <td>{order.id}</td>
        <td>{order.date}</td>

        <td>
          <p>
            <span> ${order.total} </span>
            <span> ({order.items} items)</span>
          </p>
        </td>
        <td>{order.status}</td>
        <td>
          <NavLink
            onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
            to="/u/dashboard/orders-history/id/123/"
          >
            View
          </NavLink>
        </td>
      </tr>
    );
  });

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  let itemsPerPage = 14;

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = mapOrders.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(mapOrders.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (e: any) => {
    const newOffset = (e.selected * itemsPerPage) % mapOrders.length;
    // console.log(
    //   `User requested page number ${e.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  // console.log(orders);
  return (
    <div className="wishlist-page-container">
      <div className="wishlist-page-table">
        <div className="table-title">
          <h3>Orders History</h3>
        </div>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{currentItems}</tbody>
        </table>
        <div className="pagination-comp">
          <ReactPaginate
            onClick={() => window.scrollTo({ top: 160, behavior: "instant" })}
            className="pagination"
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
      </div>
    </div>
  );
}
