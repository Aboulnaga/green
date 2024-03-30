import EditableInput from "../../../Components/Buttons/EditableInput/EditableInput";
import CountrySelectBTN from "../../../Components/Buttons/CountrySelectBTN/CountrySelectBTN";
// import { authUser } from "../../../Config/FireBaseConfig";
import UserInfoComp from "../../../Components/DshboardSettingsPage/UserInfoComp/UserInfoComp";
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
          <div className="billing-info settings-page">
            <div className="billing-info-form">
              <form>
                {/* row 1 */}
                <div className="row-1">
                  <EditableInput
                    inputName="firstName"
                    containerClass="first-name"
                    inputID="billFirstName"
                    inputLabel="First Name"
                    inputType="text"
                    inputValue={"Abdelrahman"}
                    readOnlyFeature={true}
                  />

                  <EditableInput
                    inputName="lastName"
                    containerClass="last-name"
                    inputID="billLastName"
                    inputLabel="Last Name"
                    inputType="text"
                    inputValue={"Mahmoud"}
                    readOnlyFeature={true}
                  />

                  <EditableInput
                    inputName="company"
                    containerClass="company"
                    inputID="company"
                    inputType="text"
                    inputValue={"Green Store"}
                    readOnlyFeature={true}
                  >
                    Company Name <span>(optional)</span>
                  </EditableInput>
                </div>

                {/* row 2 */}

                <div className="row-2">
                  <EditableInput
                    inputName="street-address"
                    containerClass="street-address"
                    inputID="street-address"
                    inputType="text"
                    inputValue={"10th of ramdan, alkourba"}
                    readOnlyFeature={true}
                    inputLabel="Street Address"
                  />
                </div>

                {/* row 3  */}

                <div className="row-3">
                  <div className="country">
                    <label htmlFor="country">Country / Region</label>
                    <select name="country" id="country">
                      <option value="egy">Egypt</option>
                    </select>
                  </div>

                  <div className="stats">
                    <label htmlFor="stats">State</label>
                    <select name="stats" id="stats">
                      <option value="alex"> Alex</option>
                    </select>
                  </div>

                  <EditableInput
                    inputName="zipCode"
                    containerClass="zip-code"
                    inputID="zip-code"
                    inputType="text"
                    inputValue={"123456"}
                    readOnlyFeature={true}
                    inputLabel="Zip Code"
                  />
                </div>

                {/* row 4 */}
                <div className="row-4">
                  <EditableInput
                    inputName="phone"
                    containerClass="phone"
                    inputID="billPhone"
                    inputType="text"
                    inputValue={"01000000000"}
                    readOnlyFeature={true}
                    inputLabel="Phone"
                  />

                  <EditableInput
                    inputName="email"
                    containerClass="email"
                    inputID="billEmail"
                    inputType="email"
                    inputValue={"abdelrahman_luka@gmail.com"}
                    readOnlyFeature={true}
                    inputLabel="Email"
                  />
                </div>

                {/* row 5 */}
                <div className="row-5">
                  <button>Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/****************  Password ******************** */}
        <div className="password-container settings-page-container">
          <div className="section-title">
            <h3>Change Password</h3>
          </div>
          <div className="password settings-page">
            <div className="password-form">
              <form>
                {/* row 1 */}
                <div className="row-1">
                  <EditableInput
                    inputName="currentPassword"
                    containerClass="current-password"
                    inputID="current-password"
                    inputLabel="Current Password"
                    inputType="password"
                    inputValue={"123456"}
                    readOnlyFeature={true}
                  />
                </div>

                {/* row 2 */}
                <div className="row-2">
                  <EditableInput
                    inputName="newPassword"
                    containerClass="new-password"
                    inputID="new-password"
                    inputLabel="New Password"
                    inputType="password"
                    inputValue={"123456"}
                    readOnlyFeature={true}
                  />

                  <EditableInput
                    inputName="confirmPassword"
                    containerClass="confirm-password"
                    inputID="confirm-password"
                    inputLabel="Confirm Password"
                    inputType="password"
                    inputValue={"123456"}
                    readOnlyFeature={true}
                  />
                </div>

                {/* row 3 */}
                <div className="row-3">
                  <div className="submit">
                    <button type="submit">Save Changes</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <CountrySelectBTN />
    </section>
  );
}
