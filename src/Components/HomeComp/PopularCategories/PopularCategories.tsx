import { Link } from "react-router-dom";
import { GreenContext } from "../../../Providers/LocalContextProvider";
import { useContext } from "react";
import { localContextType } from "../../../Providers/LocalContextProvider";
export default function PopularCategories() {
  const { state } = useContext(GreenContext) as localContextType;
  const { CategoriesDB } = state;
  const categorieMap = CategoriesDB.map((cat, i) => {
    const url = cat.cat_name.split(" ").join("-").toLocaleLowerCase();
    return (
      <div key={i} className="category">
        <Link to={`/shop/${url}`}>
          <div className="img">
            <img src={cat.cat_img} alt={cat.cat_name} />
          </div>
          <div className="info">
            <p>{cat.cat_name}</p>
          </div>
        </Link>
      </div>
    );
  });
  return (
    <section className="popular-categories-container">
      <div className="popular-categories fix-width center">
        <div className="header">
          <h3>Popular Categories</h3>
          <Link to="/shop">
            View All{" "}
            <svg
              width="17"
              height="14"
              viewBox="0 0 17 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 7.00049H1"
                stroke="#00B307"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.94995 0.975464L16 6.99946L9.94995 13.0245"
                stroke="#00B307"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
        <div className="categories">{categorieMap}</div>
      </div>
    </section>
  );
}
