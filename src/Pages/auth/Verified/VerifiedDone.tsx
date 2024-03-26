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
    window.addEventListener("DOMContentLoaded", async () => {
      const res = await handleVerifyEmail(authUser, actionCode);
      if (!res) return;
      const tst = await setDoc(doc(db, "users", userId as string), {
        is_verfied: true,
        user_updatedAT: Timestamp.fromDate(new Date("December 10, 1815")),
      });
      console.log(tst);
    });
  }, []);

  const handleVerifyEmail = async (auth: any, actionCode: any) => {
    await applyActionCode(auth, actionCode);
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
