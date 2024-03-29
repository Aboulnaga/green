import { db_user_type } from "../../Type/commonType";
import { Link } from "react-router-dom";
export default function UserDashboardCol_1({
  currentUser,
}: {
  currentUser: db_user_type | null;
}) {
  return (
    <>
      <div className="dashboard-page-container__col1">
        <img src={currentUser?.user_avatar} alt={currentUser?.user_name} />
        <p>{currentUser?.user_name}</p>
        <p>{currentUser?.user_role}</p>
        <Link to={"/u/dashboard/settings/"}>Edit Profile</Link>
      </div>
    </>
  );
}

/* <div className="dashboard-page-container__col1">
          <Spinner isLoading={isLoading}>
            <img
              src={currentUser?.user_avatar}
              alt={currentUser?.user_name}
            />
            <p>{currentUser?.user_name}</p>
            <p>{currentUser?.user_role}</p>
            <Link to={"/u/dashboard/settings/"}>Edit Profile</Link>
          </Spinner>
        </div> */
