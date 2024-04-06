import HeaderComp from "../../Components/Header/HeaderComp";
import Footer from "../../Components/Footer/Footer";
import { Outlet } from "react-router-dom";

export default function ErrorsLayout() {
  return (
    <>
      <HeaderComp />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
