import { Link } from "react-router-dom";
export default function UserDashboardPage() {
  return (
    <div className="dashboard-page-container">
      <div className="dashboard-page-container__col1">
        <img src="/img/pages/dashboard/user.jpg" alt="user name" />
        <p>Abdelrahman Mahmoud Ahmed zaher Abdel Azem Salama Abdelrahman</p>
        <p>Customer</p>
        <a href="#">Edit Profile</a>
      </div>
      <div className="dashboard-page-container__col2">
        <p>BILLING ADDRESS</p>
        <div className="user-info">
          <p>Abdelrahman Mahmoud Ahmed Abdel Azem Salama Abdelrahman</p>
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
          <Link to="/dashboard/order">View</Link>
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
                <p>
                  $250
                  <span>(4 items)</span>
                </p>
              </td>
              <td>
                <Link to="/u/dashboard/order-history/id/123/">View</Link>
              </td>
            </tr>

            <tr>
              <td>#123456</td>
              <td>2022-01-01</td>
              <td>Delivered</td>
              <td>
                <p>
                  $500
                  <span>(7 items)</span>
                </p>
              </td>
              <td>
                <Link to="/u/dashboard/order-history/id/123/">View</Link>
              </td>
            </tr>

            <tr>
              <td>#123456</td>
              <td>2022-01-01</td>
              <td>Delivered</td>
              <td>
                <p>
                  $1000 <span>(10 items)</span>
                </p>
              </td>
              <td>
                <Link to="/u/dashboard/order-history/id/123/">View</Link>
              </td>
            </tr>

            <tr>
              <td>#123456</td>
              <td>2022-01-01</td>
              <td>Delivered</td>
              <td>
                <p>
                  $70 <span>(1 items)</span>
                </p>
              </td>
              <td>
                <Link to="/u/dashboard/order-history/id/123/">View</Link>
              </td>
            </tr>

            <tr>
              <td>#123456</td>
              <td>2022-01-01</td>
              <td>Delivered</td>
              <td>
                <p>
                  $100
                  <span>(3 items)</span>
                </p>
              </td>
              <td>
                <Link to="/u/dashboard/order-history/id/123/">View</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
