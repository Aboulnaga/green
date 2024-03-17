import "./Style.scss";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import HeaderComp from "./Components/Header/HeaderComp";
import Footer from "./Components/Footer/Footer";
import Loader from "./Components/Loader/Loader";

export default function MainLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.onload = () => {
      setLoading(false);
    };
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HeaderComp />
          <main>
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
