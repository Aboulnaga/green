import { useState } from "react";
export default function InStockBTN({
  status,
  inStockClass,
  inStockClassContainer,
  hover,
}: {
  status: boolean;
  inStockClass: string;
  inStockClassContainer: string;
  hover?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  if (status) {
    // console.log(status);
    return (
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`true-container ${inStockClassContainer}`}
      >
        {hover && hovered ? (
          <div className="msg">
            <p>In Stock</p>
          </div>
        ) : null}
        <div className={`instock-true ${inStockClass}`}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Check">
              <g id="Group">
                <path
                  id="Vector"
                  d="M16.6663 5.83301L7.49967 14.9997L3.33301 10.833"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </g>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`false-container ${inStockClassContainer}`}
    >
      {hover && hovered ? (
        <div className="msg">
          <p>Out Of Stock</p>
        </div>
      ) : null}
      <div className={`instock-false ${inStockClass}`}>X</div>
    </div>
  );
}
