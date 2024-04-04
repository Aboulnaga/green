import UserInfoComp from "../../../Components/DshboardSettingsPage/UserInfoComp/UserInfoComp";
import BillingInfoComp from "../../../Components/DshboardSettingsPage/BillingInfoComp/BillingInfoComp";
import ChangePasswordComp from "../../../Components/DshboardSettingsPage/ChangePassword/ChangePasswordComp";
export default function UserSettings_old() {
  // const userId = authUser.currentUser?.uid;

  return (
    <section className="user-settings-container">
      <div className="user-settings">
        {/****************  user info ******************** */}
        <div className="user-info-container settings-page-container">
          <div className="section-title ">
            <h3>Account Settings</h3>
          </div>
          <UserInfoComp />
        </div>
        {/****************  Billing Info ******************** */}
        <div className="billing-info-container settings-page-container">
          <div className="section-title">
            <h3>Billing Info</h3>
          </div>
          <BillingInfoComp />
        </div>
        {/****************  Password ******************** */}
        <div className="password-container settings-page-container">
          <div className="section-title">
            <h3>Change Password</h3>
          </div>
          <div className="password settings-page">
            <ChangePasswordComp />
          </div>
        </div>
      </div>
    </section>
  );
}
