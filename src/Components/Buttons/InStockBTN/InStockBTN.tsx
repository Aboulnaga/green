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
        <div className={`instock-true ${inStockClass}`}>i</div>
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
      <div className={`instock-false ${inStockClass}`}>i</div>
    </div>
  );
}
