import { Helmet } from "react-helmet-async";
// import { Site_URL } from "../../../Lab/Info";
export default function HomeMetaTags() {
  const GreenUrl = import.meta.env.VITE_GREEN_URL;
  // console.log(GreenUrl);
  // const Vite = process.env.VITE_GREEN_URL;
  // console.log(Vite);

  return (
    <Helmet>
      <title>Green - home</title>
      <meta
        name="keywords"
        content="vegetables, healthy, organic, fresh, delivery, online orders,Green Store"
      />
      <meta
        name="description"
        content="Green Store - Your one-stop shop for fresh, healthy, and organic vegetables. Enjoy a quick and easy shopping experience with delivery to your doorstep. Order now!"
      />
      <meta name="author" content="Green Store" />
      <meta name="copyright" content="Green Store" />
      <meta name="language" content="EN" />
      <meta
        property="og:title"
        content="Green Store: Fresh & Healthy Delivered"
      />
      <meta property="og:type" content="product.group" />
      <meta property="og:url" content={`${GreenUrl}/`} />
      <meta property="og:image" content={`${GreenUrl}/img/meta/ogImage.jpg`} />
      <meta property="og:site_name" content="Green Store" />
      <meta
        property="og:description"
        content="Green Store - Get fresh, healthy, and organic vegetables delivered straight to your door! Enjoy a quick and easy online shopping experience. Order now and discover a convenient way to eat well!
"
      />
      <meta
        property="og:keywords"
        content="fresh vegetables, healthy produce, organic food, convenient delivery, online grocery shopping,Green Store
"
      />
    </Helmet>
  );
}
