import BreadCrumbsComp from "../../../Components/BreadCrumbs/BreadCrumbs";
import { Link, useSearchParams } from "react-router-dom";
import { applyActionCode } from "firebase/auth";
import { authUser } from "../../../Config/FireBaseConfig";
import { useEffect, useState } from "react";
export default function VerifiedDonePage() {
  const [searchParams] = useSearchParams();
  const actionCode = searchParams.get("oobCode");
  const [res, setRes] = useState<any>("");

  useEffect(() => {
    function handleVerifyEmail(auth: any, actionCode: any) {
      applyActionCode(auth, actionCode)
        .then(resp => {
          setRes(resp);
          console.log(resp);
        })
        .catch(error => {
          // console.log(error.message);
        });
    }

    window.addEventListener("DOMContentLoaded", () =>
      handleVerifyEmail(authUser, actionCode)
    );
  }, []);

  console.log(res);

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
