import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
export default function OrderDetailsPage() {
  return (
    <>
      <Helmet>
        <title>Green Store - Order Details</title>
      </Helmet>

      <div className="order-details-container">
        <div className="order-details">
          {/* ***************************** title ************************ */}

          <div className="head-title">
            <div className="head-info">
              <h3>Order Details</h3>
              <p>
                (<span>4-1-2023</span> / <span>3 items</span>){" "}
              </p>
            </div>
            <div className="back-link">
              <Link to="/u/dashboard/orders-history/">Back</Link>
            </div>
          </div>
          {/* ***************************** billing address ************************ */}
          <div className="billing-address">
            <div className="title">
              <p>Billing Address</p>
            </div>
            <div className="info">
              <div className="name">
                <p>Abdelrahman Mahmoud Ahmed</p>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Enim, sit dolorum! Quia, voluptatibus incidunt.
                </p>
              </div>
              <div className="email">
                <p>Email</p>
                <p>abdelrahman_luka@gmail</p>
              </div>
              <div className="phone">
                <p>Phone</p>
                <p>(010) 123-456-789</p>
              </div>
            </div>
          </div>
          {/* ***************************** shipping address ************************ */}

          <div className="shipping-address">
            <div className="title">
              <p>Shipping Address</p>
            </div>
            <div className="info">
              <div className="name">
                <p>Abdelrahman Mahmoud Ahmed</p>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Enim, sit dolorum! Quia, voluptatibus incidunt.
                </p>
              </div>
              <div className="email">
                <p>Email</p>
                <p>abdelrahman_luka@gmail</p>
              </div>
              <div className="phone">
                <p>Phone</p>
                <p>(010) 123-456-789</p>
              </div>
            </div>
          </div>

          {/* ***************************** order details ************************ */}

          <div className="bill-details">
            <div className="title">
              <p>
                <span>ORDER ID:</span> <span>#123</span>
              </p>
              <p>
                <span>PAYMENT METHOD: </span>
                <span>Master Card</span>
              </p>
            </div>

            <div className="info">
              <p>
                <span>Subtotal:</span> <span>$500</span>
              </p>
              <p>
                <span>Discount:</span> <span>10%</span>
              </p>
              <p>
                <span>Shipping:</span> <span>$10</span>
              </p>
              <p>
                <span>Total:</span> <span>$460</span>
              </p>
            </div>
          </div>

          {/* ***************************** process bar ************************ */}

          <div className="process-bar-container">
            <div className="process-bar">
              <div className="process-bar__grey"></div>
              <div className="process-bar__green"></div>

              <div className="progress">
                <div className="order-received">
                  <div className="icon">
                    <div className="icon__svg">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.6663 5.83301L7.49967 14.9997L3.33301 10.833"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p>1</p>
                  </div>
                  <p>Order Received</p>
                </div>
                <div className="process">
                  <div className="icon">
                    <div className="icon__svg">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.6663 5.83301L7.49967 14.9997L3.33301 10.833"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p>2</p>
                  </div>
                  <p>Process</p>
                </div>

                <div className="on-the-way">
                  <div className="icon">
                    <div className="icon__svg">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.6663 5.83301L7.49967 14.9997L3.33301 10.833"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p>3</p>
                  </div>
                  <p>On the way</p>
                </div>

                <div className="delivered">
                  <div className="icon">
                    <div className="icon__svg">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.6663 5.83301L7.49967 14.9997L3.33301 10.833"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p>4</p>
                  </div>
                  <p>Delivered</p>
                </div>
              </div>
            </div>
          </div>

          {/* ***************************** Process bar wide screen ************************ */}

          <div className="process-bar-wide">
            <div className="bar-wide">
              <div className="grey"></div>
              <div className="green"></div>
            </div>
            <div className="progress-wide">
              <div className="order-received-wide">
                <div className="icon">
                  <div className="icon__svg">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.6663 5.83301L7.49967 14.9997L3.33301 10.833"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p>1</p>
                </div>
                <p>Order Received</p>
              </div>
              <div className="process-wide">
                <div className="icon">
                  <div className="icon__svg">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.6663 5.83301L7.49967 14.9997L3.33301 10.833"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p>2</p>
                </div>
                <p>Process</p>
              </div>

              <div className="on-the-way-wide">
                <div className="icon">
                  <div className="icon__svg">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.6663 5.83301L7.49967 14.9997L3.33301 10.833"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p>3</p>
                </div>
                <p>On the way</p>
              </div>

              <div className="delivered-wide">
                <div className="icon">
                  <div className="icon__svg">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.6663 5.83301L7.49967 14.9997L3.33301 10.833"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p>4</p>
                </div>
                <p>Delivered</p>
              </div>
            </div>
          </div>

          {/* ***************************** products ************************ */}

          <div className="items-table">
            <table cellSpacing={0}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {/* product 1 */}
                <tr>
                  <td>
                    <img
                      src="/img/pages/order-details/image1.jpg"
                      alt="image 1"
                    />
                    <p>red capsium</p>
                  </td>
                  <td>$14.00</td>
                  <td>3</td>
                  <td>$42.00</td>
                </tr>

                {/* product 2 */}
                <tr>
                  <td>
                    <img
                      src="/img/pages/order-details/image2.jpg"
                      alt="image 1"
                    />
                    <p>green capsium</p>
                  </td>
                  <td>$30.00</td>
                  <td>5</td>
                  <td>$150.00</td>
                </tr>

                {/* product 3 */}
                <tr>
                  <td>
                    <img
                      src="/img/pages/order-details/image3.jpg"
                      alt="image 1"
                    />
                    <p>green chili </p>
                  </td>
                  <td>$8.00</td>
                  <td>8</td>
                  <td>$64.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
