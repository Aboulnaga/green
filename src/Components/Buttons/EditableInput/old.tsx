// import { useState, useRef } from "react";

// export default function EditableInput({
//   children,
//   containerClass,
//   inputID,
//   inputLabel,
//   inputValue,
//   inputType,
//   readOnlyFeature,
//   inputName,
// }: {
//   children?: React.ReactNode;
//   containerClass: string;
//   inputValue?: string;
//   inputType: string;
//   inputID: string;
//   inputLabel?: string;
//   readOnlyFeature: boolean;
//   inputName: string;
// }) {
//   const [isReadOnly, setIsReadOnly] = useState(true);
//   const [inputValueState, setInputValueState] = useState<string | number>("");
//   const inputRef = useRef<HTMLInputElement>(null);
//   //   console.log(inputRef.current);
//   //   console.log(isInputDisabled);

//   console.log(isReadOnly);
//   function readOnly() {
//     if (readOnlyFeature && isReadOnly) {
//       return (
//         <div
//           onMouseLeave={e => {
//             e.preventDefault();

//             setIsReadOnly(true);
//             inputRef.current?.blur();
//           }}
//           className={`${containerClass} read-only editable-input`}
//         >
//           <label htmlFor={inputID}>{inputLabel || children}</label>
//           <div className="input-and-icon">
//             <input
//               onClick={e => {
//                 setIsReadOnly(false);
//                 e.preventDefault();
//               }}
//               readOnly
//               name={inputName}
//               ref={inputRef}
//               value={inputValueState || inputValue || ""}
//               type={inputType}
//               id={inputID}
//             />
//           </div>
//         </div>
//       );
//     }
//   }

//   function readAndWrite() {
//     if (readOnlyFeature && !isReadOnly) {
//       return (
//         <div
//           onMouseLeave={() => {
//             setIsReadOnly(true);
//           }}
//           className={`${containerClass} disable-read-only editable-input`}
//         >
//           <label htmlFor={inputID}>{inputLabel || children}</label>
//           <div className="input-and-icon">
//             <input
//               onChange={e => setInputValueState(e.target.value)}
//               onClick={e => {
//                 e.preventDefault();
//                 setIsReadOnly(false);
//                 inputRef.current?.focus();
//               }}
//               name={inputName}
//               autoFocus
//               ref={inputRef}
//               value={inputValueState || inputValue || ""}
//               type={inputType}
//               id={inputID}
//             />
//           </div>
//         </div>
//       );
//     }
//   }

//   return (
//     <>
//       {isReadOnly ? readOnly() : readAndWrite()}
//       {!readOnlyFeature && (
//         <div className={`${containerClass} no-read-only editable-input`}>
//           <label htmlFor={inputID}>{inputLabel || children}</label>
//           <div className="input-and-icon">
//             <input
//               name={inputName}
//               ref={inputRef}
//               defaultValue={inputValue}
//               type={inputType}
//               id={inputID}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// /*

//  <div
//       onMouseLeave={() => {
//         inputRef.current?.setAttribute("readonly", "true");
//         setIsReadOnly(true);
//         setTimeout(() => {
//           inputRef.current?.blur();
//         }, 1000);
//       }}
//       className={`${containerClass} editable-input`}
//     >
//       <label htmlFor={inputID}>{inputLabel || children}</label>
//       <div className="input-and-icon">
//         <input
//           onClick={() => {
//             inputRef.current?.removeAttribute("readonly");
//             setIsReadOnly(false);
//             setTimeout(() => {
//               inputRef.current?.focus();
//             }, 1000);
//           }}
//           name={inputName}
//           ref={inputRef}
//           readOnly={readOnlyFeature ? isReadOnly : false}
//           defaultValue={inputValue}
//           type={inputType}
//           id={inputID}
//         />
//       </div>
//     </div>

// */
