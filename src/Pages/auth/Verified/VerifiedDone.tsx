import BreadCrumbsComp from "../../../Components/BreadCrumbs/BreadCrumbs";
import { Link, useSearchParams } from "react-router-dom";
import { applyActionCode } from "firebase/auth";
import { authUser } from "../../../Config/FireBaseConfig";
import { useEffect, useState } from "react";
import { updateDoc, serverTimestamp, doc } from "firebase/firestore";
import { db } from "../../../Config/FireBaseConfig";
import { Toaster, toast } from "react-hot-toast";
export default function VerifiedDonePage() {
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const actionCode = searchParams.get("oobCode") as string;

  const userId = authUser.currentUser?.uid;

  useEffect(() => {
    // console.log("useEffect");
    const handleVerifyEmail = async () => {
      if (!authUser.currentUser)
        return setError(" please login first then click on your verified link");
      try {
        await applyActionCode(authUser, actionCode);
        await updateDoc(doc(db, "users", userId as string), {
          is_verified: true,
          user_updatedAT: serverTimestamp(),
        });
        toast.success(
          "thanks for verifying your email, redirecting to home page in 3 seconds"
        );
        setTimeout(() => {
          window.location.replace("/");
        }, 5000);
      } catch (error: any) {
        setError(
          "Something went wrong eith activation email. Please try again later."
        );
      }
    };
    handleVerifyEmail();
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
          <Toaster
            toastOptions={{ duration: 3000 }}
            position="top-center"
            reverseOrder={false}
          />
          <div className="verfied fix-width center">
            {!error ? (
              <>
                <h3>Account verified</h3>
                <p>
                  Your account has been successfully verified. You can now enjoy
                  shopping :).
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
