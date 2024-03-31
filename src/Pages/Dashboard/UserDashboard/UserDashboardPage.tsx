import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Spinner from "../../../Components/Spinner/Spinner";
import useQueryCurrentUser from "../../../Hooks/useQueryCurrentUser";
import { Toaster, toast } from "react-hot-toast";
import { useEffect } from "react";
import DefAvatarSvg from "../../../Components/defSvgProfileImg/DefAvatarSvg";
export default function UserDashboardPage() {
  const { data: currentUser, isError, isLoading } = useQueryCurrentUser();
  // console.log(isLoading, isError);
  useEffect(() => {
    if (isError) {
      toast.error("something went wrong :(");
    }
  }, [isError]);
  return (
    <>
      <Helmet>
        <title>Green Store - Dashboard</title>
      </Helmet>
      <div className="dashboard-page-container">
        <Toaster
          toastOptions={{ duration: 3000 }}
          position="top-center"
          reverseOrder={false}
        />
        <Spinner isLoading={isLoading}>
          <div className="dashboard-page-container__col1">
            {currentUser?.user_avatar.src ? (
              <img
                src={currentUser?.user_avatar.src}
                alt={currentUser?.user_name}
              />
            ) : (
              <DefAvatarSvg svgClass="df-svg-profile" />
            )}
            <p>
              {currentUser?.user_name || currentUser?.user_email.split("@")[0]}
            </p>
            <p>{currentUser?.user_role}</p>
            <Link to={"/u/dashboard/settings/"}>Edit Profile</Link>
          </div>
        </Spinner>
        <Spinner isLoading={isLoading}>
          <div className="dashboard-page-container__col2">
            <Spinner isLoading={isLoading}>
              <p>BILLING ADDRESS</p>
              <div className="user-info">
                <p>{currentUser?.user_name}</p>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Modi, maiores.
                </p>
                <p>{currentUser?.user_email}</p>
                <p>{currentUser?.user_phone}</p>
              </div>
              <a href="#">Edit Address</a>
            </Spinner>
          </div>
        </Spinner>
        <Spinner isLoading={isLoading}>
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
        </Spinner>
      </div>
    </>
  );
}

/**
 

<>
      <Helmet>
        <title>Green Store - Dashboard</title>
      </Helmet>
      <div className="dashboard-page-container">
        <div className="dashboard-page-container__col1">
          <MemoSpinner isLoading={isLoading}>
            <img
              key={currentUser?.user_id + "img"}
              src={currentUser?.user_avatar}
              alt={currentUser?.user_name}
            />
            <p>{currrentUserData?.user_name}</p>
            <p>{currrentUserData?.user_role}</p>
            <Link to={"/u/dashboard/settings/"}>Edit Profile</Link>
          </MemoSpinner>
        </div>
        <div className="dashboard-page-container__col2">
          <Spinner isLoading={isLoading}>
            <p>BILLING ADDRESS</p>
            <div className="user-info">
              <p>{currrentUserData?.user_name}</p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi,
                maiores.
              </p>
              <p>{currentUser?.user_email}</p>
              <p>{currentUser?.user_phone}</p>
            </div>
            <a href="#">Edit Address</a>
          </Spinner>
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
    </>



 */
