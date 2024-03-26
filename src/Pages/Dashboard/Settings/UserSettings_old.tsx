import EditableInput from "../../../Components/Buttons/EditableInput/EditableInput";
export default function UserSettings_old() {
  const handleInfoForm = (e: any) => {
    e.preventDefault();
    const formData: FormData = new FormData(e.target);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const phone = formData.get("phone");
    console.log(firstName, lastName, email, phone);
  };
  return (
    <section className="user-settings-container">
      <div className="user-settings">
        {/****************  user info ******************** */}
        <div className="user-info-container settings-page-container">
          <div className="section-title ">
            <h3>Account Settings</h3>
          </div>
          <div className="user-info ">
            <div className="user-img">
              <img src="/img/pages/dashboard/user.jpg" alt="user name" />
              <form>
                <button>Chose Image</button>
              </form>
            </div>
            <div className="info-form">
              <form onSubmit={handleInfoForm}>
                <EditableInput
                  containerClass="first-name"
                  inputName="firstName"
                  inputID="info-form-first-name"
                  inputLabel="First Name"
                  inputType="text"
                  inputValue={"Abdelrahman"}
                  readOnlyFeature={true}
                />

                <EditableInput
                  inputName="lastName"
                  containerClass="last-name"
                  inputID="info-form-last-name"
                  inputLabel="Last Name"
                  inputType="text"
                  inputValue={"Mahmoud"}
                  readOnlyFeature={true}
                />

                <EditableInput
                  inputName="email"
                  containerClass="email"
                  inputID="info-form-email"
                  inputLabel="Email"
                  inputType="email"
                  inputValue={"abdelrahman_luka@gmail.com"}
                  readOnlyFeature={true}
                />

                <EditableInput
                  inputName="phone"
                  containerClass="phone"
                  inputID="info-form-phone"
                  inputLabel="Phone"
                  inputType="text"
                  inputValue={"01000000000"}
                  readOnlyFeature={true}
                />

                <div className="submit">
                  <button type="submit">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
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
    </section>
  );
}
