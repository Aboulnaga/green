export default function HeroSec() {
  return (
    <section className="hero-container">
      <div className="hero fix-width center">
        <div className="hero-col1  ">
          <div className="blur">
            <div className="info">
              <h2>
                Fresh & Healthy <br /> Organic Food
              </h2>
              <div className="left-border">
                <p>
                  Sale up to <span>30% OFF</span>
                </p>
                <p className="light">Free shipping on all your order.</p>
              </div>
              <button>
                Shop Now{" "}
                <svg
                  width="18"
                  height="15"
                  viewBox="0 0 18 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5 7.50052H1.5"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.45 1.47552L16.5 7.49953L10.45 13.5245"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="hero-col hero-col2">
          <div className="img">
            <img src="./img/pages/home/hero-col2-row1.jpg" alt="hero" />
          </div>
          <div className="info">
            <p>Summer Sale</p>
            <h3>75% OFF</h3>
            <p className="light">Only Fruit & Vegetable</p>
            <button>
              Shop Now{" "}
              <svg
                width="18"
                height="15"
                viewBox="0 0 18 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.5 7.50052H1.5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.45 1.47552L16.5 7.49953L10.45 13.5245"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="hero-col hero-col3">
          <div className="img">
            <img src="./img/pages/home/hero-col2-row2.jpg" alt="hero" />
          </div>
          <div className="info">
            <p>Best Deal</p>
            <h3>Special Products</h3>
            <p className="light">Deal of the Month</p>
            <button>
              Shop Now{" "}
              <svg
                width="18"
                height="15"
                viewBox="0 0 18 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.5 7.50052H1.5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.45 1.47552L16.5 7.49953L10.45 13.5245"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="features-container">
        <div className="features fix-width center">
          <div className="feature">
            <div className="icon">
              <img
                src="./img/pages/home/free shipping.png"
                alt="Free Shipping"
              />
            </div>
            <div className="info">
              <p>Free Shipping</p>
              <p>Free shipping on all your order</p>
            </div>
          </div>

          <div className="feature">
            <div className="icon">
              <img
                src="./img/pages/home/customer support.png"
                alt="Customer Support 24/7"
              />
            </div>
            <div className="info">
              <p>Customer Support 24/7</p>
              <p>Instant access to Support</p>
            </div>
          </div>

          <div className="feature">
            <div className="icon">
              <img
                src="./img/pages/home/secure payment.png"
                alt="100% Secure Payment"
              />
            </div>
            <div className="info">
              <p>100% Secure Payment</p>
              <p>We ensure your money is save</p>
            </div>
          </div>

          <div className="feature">
            <div className="icon">
              <img
                src="./img/pages/home/money back.png"
                alt="Money-Back Guarantee"
              />
            </div>
            <div className="info">
              <p>Money-Back Guarantee</p>
              <p>30 Days Money-Back Guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
