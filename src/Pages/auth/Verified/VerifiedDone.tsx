import BreadCrumbsComp from "../../../Components/BreadCrumbs/BreadCrumbs";
import { Link, useSearchParams } from "react-router-dom";
import { applyActionCode, sendEmailVerification } from "firebase/auth";
import { authUser } from "../../../Config/FireBaseConfig";
import { useEffect } from "react";
export default function VerifiedDonePage() {
  const [searchParams] = useSearchParams();
  // console.log(searchParams);
  // const mode = searchParams.get("mode");
  const actionCode = searchParams.get("oobCode");
  const continueUrl = searchParams.get("continueUrl");
  const lang = searchParams.get("lang");
  // console.log("actionCode", actionCode);
  // console.log("continueUrl", continueUrl);
  console.log("lang", lang);

  useEffect(() => {
    function handleVerifyEmail(auth: any, actionCode: any) {
      console.log(continueUrl, lang);
      applyActionCode(auth, actionCode)
        .then(resp => {
          console.log(resp);
        })
        .catch(error => {
          console.log(error);
        });
    }

    handleVerifyEmail(authUser, actionCode);
    console.log("done");
  }, []);

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
