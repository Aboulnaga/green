import { useRef } from "react";
import { toast } from "react-hot-toast";

export default function EditableInput({
  children,
  containerClass,
  inputID,
  inputLabel,
  inputValue,
  inputType,
  readOnlyFeature,
  inputName,
  disableFeature = false,
  inputNotifyMsg = null,
}: {
  children?: React.ReactNode;
  containerClass: string;
  inputValue?: string;
  inputType: string;
  inputID: string;
  inputLabel?: string;
  readOnlyFeature: boolean;
  inputName: string;
  disableFeature?: boolean;
  inputNotifyMsg?: string | null;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  // console.log(errorMsg);

  return (
    <>
      <div
        onMouseLeave={() => {
          // setIsReadOnly(true);
          inputRef.current?.setAttribute("readonly", "true");
          inputRef.current?.blur();
        }}
        className={`${containerClass} editable-input`}
      >
        <label htmlFor={inputID}>{inputLabel || children}</label>
        <div className={disableFeature ? "disabled" : "input-and-icon"}>
          <input
            onClick={event => {
              event.stopPropagation();
              if (!disableFeature) {
                inputRef.current?.removeAttribute("readonly");
              }
              inputNotifyMsg && toast.error(inputNotifyMsg);
              inputRef.current?.focus();
            }}
            onTouchStart={event => {
              event.stopPropagation();
              if (!disableFeature) {
                inputRef.current?.removeAttribute("readonly");
              }
              inputRef.current?.focus();
            }}
            // {tst()}
            name={inputName}
            ref={inputRef}
            readOnly={readOnlyFeature && true}
            defaultValue={inputValue}
            type={inputType}
            id={inputID}
          />
        </div>
      </div>
    </>
  );
}
