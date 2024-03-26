import "./Style.scss";
import { Outlet } from "react-router-dom";
import HeaderComp from "./Components/Header/HeaderComp";
import Footer from "./Components/Footer/Footer";
import { Suspense, useEffect, useState } from "react";
import Loader from "./Components/Loader/Loader";
export default function MainLayout() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // console.log("loaded");
  }, [window.onload]);
  return (
    <>
      <Suspense fallback={<Loader />}>
        {isLoading === false ? (
          <>
            <HeaderComp />
            <main>
              <Outlet />
            </main>
            <Footer />
          </>
        ) : (
          <Loader />
        )}
      </Suspense>
    </>
  );
}
