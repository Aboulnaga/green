import "./Style.scss";
import { Outlet } from "react-router-dom";
import HeaderComp from "./Components/Header/HeaderComp";
import Footer from "./Components/Footer/Footer";
export default function MainLayout() {
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
