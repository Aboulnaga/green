import { useEffect, useState } from "react";
import ShopNowBTN from "../../Buttons/ShopNowBTN/ShopNowBTN";
export default function PopularProductsAdds() {
  const [timer, setTimer] = useState(8 * 86400);
  const days = Math.floor(timer / 86400);
  const hours = Math.floor((timer % 86400) / 3600);
  const minutes = Math.floor((timer % 3600) / 60);
  const seconds = Math.floor(timer % 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    if (timer === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer]);

  // console.log(timer);
  return (
    <section className="popular-products-adds-container">
      <div className="popular-products-adds fix-width center">
        {/* ------------ add 1 --------------------- */}
        <div className="popular-products-add popular-products-add-1">
          <div className="img">
            <img src="/img/pages/home/add1.jpg" alt="Sale of the Month" />
          </div>
          <div className="info">
            <p>Best Deals</p>
            <h2>Sale of the Month</h2>
            <div className="timer">
              <div className="timer__col1 timer__clock">
                <p>{days}</p>
                <p>{days > 1 ? "Days" : "Day"}</p>
              </div>
              <div className="timer__col2  timer__dots">
                <p>:</p>
              </div>
              <div className="timer__col3 timer__clock">
                <p>{hours}</p>
                <p>{hours > 1 ? "Hours" : "Hour"}</p>
              </div>
              <div className="timer__col4  timer__dots">
                <p>:</p>
              </div>
              <div className="timer__col5 timer__clock">
                <p>{minutes}</p>
                <p>{minutes > 1 ? "Minutes" : "Minute"}</p>
              </div>
              <div className="timer__col6 timer__dots">
                <p>:</p>
              </div>
              <div className="timer__col7 timer__clock">
                <p>{seconds}</p>
                <p>{seconds > 1 ? "Seconds" : "Second"}</p>
              </div>
            </div>
            <ShopNowBTN
              url="/shop"
              userClass="add-shpn-btn add-shpn-btn-1"
              containerClass="add-shpn-btn-container"
            >
              Shop Now
            </ShopNowBTN>
          </div>
        </div>

        {/* ------------ add 2 --------------------- */}
        <div className="popular-products-add popular-products-add-2">
          <div className="img">
            <img src="/img/pages/home/add2.jpg" alt="Low-Fat Meat" />
          </div>
          <div className="info">
            <p>85% Fat Free</p>
            <h2>Low-Fat Meat</h2>
            <div className="offer">
              <p>
                Started at <span>$79.99</span>
              </p>
            </div>
            <ShopNowBTN
              url="/shop"
              userClass="add-shpn-btn add-shpn-btn-2"
              containerClass="add-shpn-btn-container"
            >
              Shop Now
            </ShopNowBTN>
          </div>
        </div>

        {/* ------------ add 2 --------------------- */}
        <div className="popular-products-add popular-products-add-3">
          <div className="img">
            <img src="/img/pages/home/add3.jpg" alt="100% Fresh Fruit" />
          </div>
          <div className="info">
            <p>Summer Sale</p>
            <h2>100% Fresh Fruit</h2>
            <div className="offer">
              <p>
                Up to <span>64% OFF</span>
              </p>
            </div>
            <ShopNowBTN
              url="/shop"
              userClass="add-shpn-btn add-shpn-btn-3"
              containerClass="add-shpn-btn-container"
            >
              Shop Now
            </ShopNowBTN>
          </div>
        </div>
      </div>
    </section>
  );
}
