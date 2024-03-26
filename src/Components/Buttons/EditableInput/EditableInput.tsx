import { useState, useRef } from "react";

export default function EditableInput({
  children,
  containerClass,
  inputID,
  inputLabel,
  inputValue,
  inputType,
  readOnlyFeature,
  inputName,
}: {
  children?: React.ReactNode;
  containerClass: string;
  inputValue?: string;
  inputType: string;
  inputID: string;
  inputLabel?: string;
  readOnlyFeature: boolean;
  inputName: string;
}) {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  //   console.log(inputRef.current);
  //   console.log(isInputDisabled);
  return (
    <div
      onMouseLeave={() => {
        setIsReadOnly(true);
        inputRef.current?.blur();
      }}
      className={`${containerClass} editable-input`}
    >
      <label htmlFor={inputID}>{inputLabel || children}</label>
      <div className="input-and-icon">
        <input
          onClick={() => {
            setIsReadOnly(false);
            inputRef.current?.focus();
          }}
          name={inputName}
          ref={inputRef}
          readOnly={readOnlyFeature ? isReadOnly : false}
          defaultValue={inputValue}
          type={inputType}
          id={inputID}
        />
      </div>
    </div>
  );
}
