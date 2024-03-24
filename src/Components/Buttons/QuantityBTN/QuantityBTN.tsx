import { useState, useEffect } from "react";
import Z_QuantitySchema from "./Z_QuantitySchema";
import { Z_QuantitySchemaType } from "./Z_QuantitySchema";
export default function QuantityBTN({
  stockQuantity,
  defaultQuantity = 1,
  least = 1,
  most = 14,
  containerClass,
  quantityBTNSClass,
  errorMsgClass,
  setQuantity,
}: {
  stockQuantity: number;
  defaultQuantity?: number;
  least?: number;
  most?: number;
  containerClass?: string;
  quantityBTNSClass?: string;
  errorMsgClass?: string;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [quantity_in, setQuantity_in] = useState<number>(1);
  const [errMsg_in, setErrMsg_in] = useState<string | null>(null);

  useEffect(() => {
    setQuantity_in(defaultQuantity);
  }, [defaultQuantity]);

  const checkQuantity = (quantity: number) => {
    const res = Z_QuantitySchema({
      quantity,
      least,
      most,
    }) as Z_QuantitySchemaType;

    // console.log(res);

    if (!res.success) {
      setErrMsg_in(res.msg);

      if (quantity < 1) {
        setQuantity_in(1);
        setQuantity(1);
      }

      if (quantity > most) {
        setQuantity_in(most);
        setQuantity(most);
      }
    }
    if (res.success) {
      return true;
    }
  };

  const checkStockQuantity = (quantity: number) => {
    // console.log(quantity, stockQuantity);
    if (quantity > stockQuantity) {
      setErrMsg_in("out of stock");
    } else {
      return true;
    }
  };
  return (
    <div
      onClick={e => {
        e.stopPropagation();
      }}
      className={`${containerClass} quantity-btn-comp-in`}
    >
      <div className={`${quantityBTNSClass} quantity-btns-in`}>
        <div
          onClick={() => {
            setQuantity_in(quantity_in - 1);
            setQuantity(quantity_in - 1);
            const res1 = checkQuantity(quantity_in - 1);
            const res2 = checkStockQuantity(quantity_in - 1);

            if (res1 && res2) {
              setErrMsg_in(null);
            }
          }}
          className="dec "
        >
          -
        </div>

        <div className="input">
          <input
            type="number"
            value={quantity_in && quantity_in > 0 ? quantity_in : quantity_in}
            onChange={e => {
              // console.log(e.target.value);

              setQuantity_in(Number(e.target.value));
              setQuantity(Number(e.target.value));
              const res1 = checkQuantity(Number(e.target.value));
              const res2 = checkStockQuantity(Number(e.target.value));

              if (res1 && res2) {
                setErrMsg_in(null);
              }
            }}
          />
        </div>
        <div
          onClick={() => {
            setQuantity_in(quantity_in + 1);
            setQuantity(quantity_in + 1);
            const res1 = checkQuantity(quantity_in + 1);
            const res2 = checkStockQuantity(quantity_in + 1);

            if (res1 && res2) {
              setErrMsg_in(null);
            }
          }}
          className="inc"
        >
          +
        </div>
      </div>

      {errMsg_in ? (
        <div className={`${errorMsgClass} error-msg-in`}>{errMsg_in}</div>
      ) : null}
    </div>
  );
}
