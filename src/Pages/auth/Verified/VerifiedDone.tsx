import BreadCrumbsComp from "../../../Components/BreadCrumbs/BreadCrumbs";
import { Link, useSearchParams } from "react-router-dom";
import { applyActionCode } from "firebase/auth";
import { authUser } from "../../../Config/FireBaseConfig";
import { useEffect } from "react";
import useCurrentUser from "../../../Hooks/useCurrentUser";
import { setDoc, Timestamp, doc } from "firebase/firestore";
import { db } from "../../../Config/FireBaseConfig";
export default function VerifiedDonePage() {
  const [searchParams] = useSearchParams();
  const actionCode = searchParams.get("oobCode");
  const user = useCurrentUser();
  const userId = user?.user_id;

  useEffect(() => {
    handleVerifyEmail(authUser, actionCode);
    console.log(actionCode);
    console.log("useeffect");
    // window.addEventListener("DOMContentLoaded", () => {
    //   handleVerifyEmail(authUser, actionCode);
    // });
  }, []);

  const handleVerifyEmail = async (auth: any, actionCode: any) => {
    console.log("handleVerifyEmail");
    const res = await applyActionCode(auth, actionCode);
    console.log(res);

    await setDoc(doc(db, "users", userId as string), {
      is_verfied: true,
      user_updatedAT: Timestamp.fromDate(new Date("December 10, 1815")),
    });

    return true;
  };

  return (
    <>
      <BreadCrumbsComp
        path={[
          { title: "Home", url: "/" },
          { title: "Sign Up", url: "/auth/sign-up" },
          { title: "Verfied", url: "/auth/verified" },
        ]}
      />
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
