import { Helmet } from "react-helmet-async";
import HeroSec from "../../Components/HomeComp/Hero/HeroSec";
import PopularCategories from "../../Components/HomeComp/PopularCategories/PopularCategories";
import PopularProducts from "../../Components/HomeComp/PopularProducts/PopularProducts";
import PopularProductsAdds from "../../Components/HomeComp/PopularProductsAdds/PopularProductsAdds";
export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Green Store: Fresh & Healthy Delivered</title>
      </Helmet>
      <main className="home-page">
        <div className="hero-comp">
          <HeroSec />
        </div>
        <div className="popular-categories-comp">
          <PopularCategories />
        </div>
        <div className="popular-products-comp">
          <PopularProducts />
        </div>
        <div className="popular-products-adds-comp">
          <PopularProductsAdds />
        </div>
      </main>
    </>
  );
}
