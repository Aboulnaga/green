import HomeMetaTags from "../../Components/HomeComp/Meta/HomeMetaTags";
import HeroSec from "../../Components/HomeComp/Hero/HeroSec";
import PopularCategories from "../../Components/HomeComp/PopularCategories/PopularCategories";
import PopularProducts from "../../Components/HomeComp/PopularProducts/PopularProducts";
import PopularProductsAdds from "../../Components/HomeComp/PopularProductsAdds/PopularProductsAdds";
export default function HomePage() {
  return (
    <>
      <HomeMetaTags />
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
