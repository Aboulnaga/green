import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useCurrentUser from "../../../Hooks/useCurrentUser";
import { useCurrentUserType } from "../../../Hooks/useCurrentUser";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../Config/FireBaseConfig";
import { db_user_type } from "../../../Type/commonType";
import Spinner from "../../../Components/Spinner/Spinner";
import { authUser } from "../../../Config/FireBaseConfig";
export default function UserDashboardPage() {
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useCurrentUser() as useCurrentUserType;
  const userId = authUser.currentUser?.uid;
  const [currrentUserData, setCurrentUserData] = useState<db_user_type | null>(
    null
  );

  useEffect(() => {
    setIsLoading(true);
    const getUserDocFromFirebaseDB = async () => {
      if (userId) {
        const docRef = doc(db, "users", userId as string);
        const docSnap = await getDoc(docRef);

        // console.log(docRef);
        if (docSnap.exists()) {
          setCurrentUserData(docSnap.data() as db_user_type);
          // console.log("Document data:", docSnap.data());
          setIsLoading(false);
        } else {
          // docSnap.data() will be undefined in this case
          // console.log("No such document!");
          throw new Error("No such document!");
        }
      }
    };

    getUserDocFromFirebaseDB();
  }, [userId]);

  // console.log(currrentUserData);
  return (
    <>
      <Helmet>
        <title>Green Store - Dashboard</title>
      </Helmet>
      <div className="dashboard-page-container">
        <div className="dashboard-page-container__col1">
          <Spinner isLoading={isLoading}>
            <img
              key={currentUser?.user_id + "img"}
              src={currentUser?.user_avatar}
              alt={currentUser?.user_name}
            />
            <p>{currrentUserData?.user_name}</p>
            <p>{currrentUserData?.user_role}</p>
            <Link to={"/u/dashboard/settings/"}>Edit Profile</Link>
          </Spinner>
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
  );
}
