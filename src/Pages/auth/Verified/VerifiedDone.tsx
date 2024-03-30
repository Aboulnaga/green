import BreadCrumbsComp from "../../../Components/BreadCrumbs/BreadCrumbs";
import { Link, useSearchParams } from "react-router-dom";
import { applyActionCode } from "firebase/auth";
import { authUser } from "../../../Config/FireBaseConfig";
import { useEffect, useState } from "react";
import { updateDoc, Timestamp, doc } from "firebase/firestore";
import { db } from "../../../Config/FireBaseConfig";

export default function VerifiedDonePage() {
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const actionCode = searchParams.get("oobCode") as string;

  const userId = authUser.currentUser?.uid;
  // console.log("actionCode", actionCode);
  // console.log("userId", userId);

  useEffect(() => {
    // console.log("useEffect");
    window.addEventListener("load", () => {
      const handleVerifyEmail = async () => {
        try {
          // console.log("handleVerifyEmail");
          const ac = await applyActionCode(authUser, actionCode);

          const up = await updateDoc(doc(db, "users", userId as string), {
            is_verified: true,
            user_updatedAT: Timestamp.fromDate(new Date("December 10, 1815")),
          });

          console.log("ac", ac);
          console.log("up", up);
        } catch (error: any) {
          console.log("error", error);
          setError(
            "Something went wrong eith activation email. Please try again later."
          );
        }
      };
      handleVerifyEmail();
    });
  }, []);

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
            {!error ? (
              <>
                <h3>Account verified</h3>
                <p>
                  Your account has been successfully verified. You can now,{" "}
                  <span>
                    <Link to="/auth/sign-in">Sign In</Link>{" "}
                  </span>
                  , enjoy shopping.
                </p>
              </>
            ) : (
              <>
                <h3>Verification failed :(</h3>
                <p>{error}</p>
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
