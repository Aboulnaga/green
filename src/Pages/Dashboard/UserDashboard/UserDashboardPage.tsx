import { Link } from "react-router-dom";
export default function UserDashboardPage() {
  return (
    <div className="dashboard-page-container">
      <div className="dashboard-page-container__col1">
        <img src="/img/pages/dashboard/user.jpg" alt="user name" />
        <p>Abdelrahman Mahmoud</p>
        <p>Customer</p>
        <a href="#">Edit Profile</a>
      </div>
      <div className="dashboard-page-container__col2">
        <p>BILLING ADDRESS</p>
        <div className="user-info">
          <p>Abdelrahman Mahmoud</p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi,
            maiores.
          </p>
          <p>abdelrahman_luka@gmail.com</p>
          <p> (010) 123-456-789</p>
        </div>
        <a href="#">Edit Address</a>
      </div>
      <div className="dashboard-page-container__col3">
        <div className="table-title">
          <p>Recent Order History</p>
          <Link to="/dashboard/order">View All</Link>
        </div>
        <table cellSpacing={0} className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#123456</td>
              <td>2022-01-01</td>
              <td>Delivered</td>
              <td>
                $250 <span>(4 items)</span>
              </td>
              <td>
                <Link to="/dashboard/order/123456">View Details</Link>
              </td>
            </tr>

            <tr>
              <td>#123456</td>
              <td>2022-01-01</td>
              <td>Delivered</td>
              <td>
                $600 <span>(7 items)</span>
              </td>
              <td>
                <Link to="/dashboard/order/123456">View Details</Link>
              </td>
            </tr>

            <tr>
              <td>#123456</td>
              <td>2022-01-01</td>
              <td>Delivered</td>
              <td>
                $1000 <span>(10 items)</span>
              </td>
              <td>
                <Link to="/dashboard/order/123456">View Details</Link>
              </td>
            </tr>

            <tr>
              <td>#123456</td>
              <td>2022-01-01</td>
              <td>Delivered</td>
              <td>
                $70 <span>(1 items)</span>
              </td>
              <td>
                <Link to="/dashboard/order/123456">View Details</Link>
              </td>
            </tr>

            <tr>
              <td>#123456</td>
              <td>2022-01-01</td>
              <td>Delivered</td>
              <td>
                $100 <span>(3 items)</span>
              </td>
              <td>
                <Link to="/dashboard/order/123456">View Details</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
