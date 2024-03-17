import BreadCrumbsComp from "../../../Components/BreadCrumbs/BreadCrumbs";
import { Link } from "react-router-dom";
export default function VerifiedDonePage() {
  return (
    <>
      <BreadCrumbsComp path={[{ title: "Verfied", url: "auth/verified" }]} />
      <main>
        <section className="verfied-done-page-container">
          <div className="verfied fix-width center">
            <h3>Account verified</h3>
            <p>
              Your account has been successfully verified. You can now,{" "}
              <span>
                <Link to="/auth/sign-in">Sign In</Link>{" "}
              </span>
              , enjoy shopping.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
