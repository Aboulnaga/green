import BreadCrumbsComp from "../../../Components/BreadCrumbs/BreadCrumbs";
export default function VerfiyEmailPage() {
  return (
    <>
      <BreadCrumbsComp
        path={[
          { title: "Home", url: "/" },
          { title: "Sign Up", url: "/auth/sign-up" },
          { title: "Verfiy Email", url: "/auth/verify-email" },
        ]}
      />
      <main>
        <section className="verfiy-email-page-container">
          <div className="verfiy fix-width center">
            <h3>Verfiy Email</h3>
            <p>
              We've sent an message to your inbox. Please check your email and
              click on the link to verify your account.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
