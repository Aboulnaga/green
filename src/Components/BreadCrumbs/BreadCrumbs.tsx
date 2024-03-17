import { Link, NavLink } from "react-router-dom";

export default function BreadCrumbsComp({
  path,
}: {
  path: { url: string; title: string }[];
}) {
  const mapPath = path.map((path, i) => {
    return (
      <li key={i}>
        <NavLink to={`/${path.url}`}>{path.title}</NavLink>
      </li>
    );
  });
  return (
    <section className="bread-crumbs-comp">
      <div className="bread-crumbs fix-width center">
        <ul>
          <li>
            <Link to="/">
              <svg
                width="18"
                height="19"
                viewBox="0 0 18 19"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.00012 8L9.00012 1L17.0001 8V18H12.0001V14C12.0001 13.2044 11.6841 12.4413 11.1214 11.8787C10.5588 11.3161 9.79577 11 9.00012 11C8.20447 11 7.44141 11.3161 6.8788 11.8787C6.31619 12.4413 6.00012 13.2044 6.00012 14V18H1.00012V8Z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </li>
          <li>
            <img src="/img/breadcrumbs/arrow.png" alt="arrow" />
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <img src="/img/breadcrumbs/arrow.png" alt="arrow" />
          </li>

          {mapPath ? mapPath : null}
        </ul>
      </div>
    </section>
  );
}
