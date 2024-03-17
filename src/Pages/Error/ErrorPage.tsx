import { Link } from "react-router-dom";
export default function ErrorPage() {
  return (
    <main>
      <section className="error-page-container">
        <div className="error-page fix-width center">
          <h3>Page Not Found</h3>
          <p>The page you are looking for does not exist.</p>
          <p>Please check the URL and try again.</p>
          <Link to="/">Go Home</Link>
        </div>
      </section>
    </main>
  );
}
