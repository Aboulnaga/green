import { Outlet } from "react-router-dom";
import HeaderComp from "../../Components/Header/HeaderComp";
import Footer from "../../Components/Footer/Footer";
export default function ShopLayout() {
  return (
    <>
      <HeaderComp />
      <div className="shop-layout">
        <h1>this is shoplayout</h1>
        <div style={{ display: "flex" }} className="shop-layout">
          <aside style={{ width: "20%" }}>
            <p>Categories</p>
            <nav>
              <ul>
                <li>All</li>
                <li>Vegetables</li>
                <li>Fruits</li>
                <li>Meat</li>
                <li>Drinks</li>
              </ul>
            </nav>
          </aside>
          <main>
            <Outlet />
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
}
