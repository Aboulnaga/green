import { useNavigate } from "react-router-dom";
export default function ShopNowBTN({
  children,
  url,
  userClass,
  containerClass,
}: {
  children: React.ReactNode;
  url: string;
  userClass: string;
  containerClass: string;
}) {
  const navigate = useNavigate();
  return (
    <div className="shop-now-btn-comp">
      <div className={containerClass}>
        <button
          className={userClass}
          onClick={() => navigate(url)}
          style={{
            pointerEvents: "all",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          {children}{" "}
          <svg
            style={{
              pointerEvents: "none",
            }}
            width="17"
            height="15"
            viewBox="0 0 17 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#00B307"
          >
            <path
              d="M16 7.50049H1"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.95001 1.47559L16 7.49959L9.95001 13.5246"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
