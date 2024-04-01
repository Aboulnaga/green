// import { useEffect, useState } from "react";

// import DefAvatarSvg from "../defSvgProfileImg/DefAvatarSvg";
// import Z_imageSchema from "./UserInfoComp/Z_imageSchema";
// import { toast } from "react-hot-toast";
// import {
//   ref,
//   uploadBytes,
//   getDownloadURL,
//   getMetadata,
//   deleteObject,
// } from "firebase/storage";
// import { storage } from "../../Config/FireBaseConfig";
// import { db } from "../../Config/FireBaseConfig";
// import {
//   collection,
//   updateDoc,
//   doc,
//   serverTimestamp,
// } from "firebase/firestore";
// import { db_user_type } from "../../Type/commonType";
// import { useRef } from "react";
// import OpacitySpinner from "../OpacitySpinner/OpacitySpinner";
// import useQueryCurrentUser from "../../Hooks/useQueryCurrentUser";
// export default function UploadImage({
//   isError,
//   currentUserData,
// }: {
//   isError: boolean;
//   isLoading: boolean;
//   currentUserData: db_user_type;
// }) {
//   const { data: currentUser } = useQueryCurrentUser();
//   const [newImage, setNewImage] = useState<{
//     name: string;
//     file: File;
//     blob: {};
//   } | null>(null);

//   const imgRef = useRef<HTMLImageElement>(null);
//   const [isUploading, setUploading] = useState(false);
//   //   console.log(uploadProgress);

//   useEffect(() => {
//     if (isError) {
//       toast.error("something went wrong right now, with the server!");
//     }
//   }, [isError]);

//   const handleImage = (e: any) => {
//     e.preventDefault();
//     const input = document.createElement("input");
//     input.type = "file";
//     input.accept = "image/*";
//     input.click();
//     input.addEventListener("change", e => {
//       const file = e.target as HTMLInputElement;
//       if (file.files && file.files.length > 0) {
//         const newImageFile = file.files[0];
//         const newImageName = newImageFile.name;
//         const reader = new FileReader();
//         reader.onload = () => {
//           const arrayBuffer = reader.result;
//           const blob = new Blob([arrayBuffer] as BlobPart[], {
//             type: newImageFile.type,
//           });
//           // console.log(blob);
//           // ... استخدم Blob هنا ...
//           setNewImage({ name: newImageName, file: newImageFile, blob });
//         };
//         reader.readAsArrayBuffer(newImageFile);
//       }
//     });
//   };

//   const checkImageByZod = ({
//     height,
//     width,
//   }: {
//     height: number;
//     width: number;
//   }) => {
//     const res = Z_imageSchema.safeParse({
//       type: newImage?.file.type,
//       size: newImage?.file.size,
//       dimensions: `${width}x${height}`,
//     });

//     if (!res.success) {
//       toast.error(`${res.error.issues[0].message} :(`);
//     }

//     if (res.success) {
//       uploadImage();
//       return true;
//     }
//   };

//   const uploadImage = async () => {
//     try {
//       setUploading(true);
//       //   const storage = getStorage();
//       const storageRef = ref(
//         storage,
//         `profile_pic/${currentUserData?.user_id}-${newImage?.name}`
//       );
//       deleteUserOldAvatar({
//         src: currentUser?.user_avatar.src,
//         id: currentUser?.user_avatar.id,
//       } as { src: string; id: string });
//       // del.then(res => console.log(res));

//       const dbRes = await uploadBytes(storageRef, newImage?.blob as Blob);
//       console.log(dbRes);
//       const avatatFullLink = getDownloadURL(dbRes.ref);
//       avatatFullLink.then(link => {
//         const updateResult = upadateUserAvatarWithUploadedImage({
//           path: link,
//           id: dbRes.metadata.name,
//         });

//         updateResult
//           .then(() => {
//             toast.success("profile image updated :)");
//             setUploading(false);
//             setTimeout(() => {
//               window.location.reload();
//             }, 2000);
//           })
//           .catch(() => {
//             toast.error(`something went wrong during update process :(`);
//           });
//         // console.log(res);
//       });
//     } catch (err) {
//       toast.error(`something went wrong :(`);
//     }
//   };

//   /**
//    upadateUserAvatarWithUploadedImage({
//             path: res,
//             id: dbRes.metadata.name,
//           })
//           toast.success("profile image updated :)");
//           setTimeout(() => {
//             setUploading(false);
//             //     // window.location.reload();
//           }, 3000);
//           //  }

//   */

//   const deleteUserOldAvatar = async (avatar: { src: string; id: string }) => {
//     try {
//       const storageRef = ref(storage, `profile_pic/${avatar.id}`);
//       const meta = await getMetadata(storageRef);
//       if (meta.name) {
//         await deleteObject(storageRef);
//         return true;
//       } else {
//         return false;
//       }
//     } catch (err) {
//       toast.error(`something went wrong delete old image :(`);
//     }
//   };

//   const upadateUserAvatarWithUploadedImage = async ({
//     path,
//     id,
//   }: {
//     path: string;
//     id: string;
//   }) => {
//     try {
//       const collectionRef = collection(db, "users");
//       const docRef = doc(collectionRef, currentUserData?.user_id as string);
//       await updateDoc(docRef, {
//         user_avatar: { src: path, id: id },
//         user_updatedAT: serverTimestamp(),
//       });

//       return true;
//     } catch (e) {
//       toast.error(`cant update profile image right now :(`);
//     }
//   };

//   return (
//     <div className="user-img">
//       <OpacitySpinner isLoading={isUploading}>
//         {newImage ? (
//           <img
//             ref={imgRef}
//             onLoad={e => {
//               const imgTarget = e.target as HTMLImageElement;
//               const h = imgTarget.naturalHeight;
//               const w = imgTarget.naturalWidth;
//               // console.log(imgTarget);
//               checkImageByZod({ height: h, width: w });
//               imgRef.current?.blur();
//             }}
//             src={URL.createObjectURL(newImage?.file)}
//             alt={currentUserData?.user_firstName}
//           />
//         ) : (
//           <>
//             {currentUserData?.user_avatar.src ? (
//               <img
//                 className="user-avatar"
//                 src={currentUserData?.user_avatar.src}
//                 alt={currentUserData?.user_name}
//               />
//             ) : (
//               <DefAvatarSvg svgClass="user-avatar-svg" />
//             )}
//           </>
//         )}
//       </OpacitySpinner>
//       <form>
//         <button
//           style={
//             isUploading
//               ? {
//                   cursor: "progress",
//                 }
//               : {}
//           }
//           onClick={e => {
//             e.preventDefault();
//             if (isUploading) {
//               toast.error("cant upload image during upload process :(");
//             }
//             if (!isUploading) {
//               handleImage(e);
//             }
//           }}
//         >
//           Chose Image
//         </button>
//       </form>
//     </div>
//   );
// }

// /**

//  const uploadImage = async () => {
//     try {
//       setUploading(true);
//       //   const storage = getStorage();
//       const storageRef = ref(
//         storage,
//         `profile_pic/${currentUserData?.user_id}-${newImage?.name}`
//       );
//       const dbRes = await uploadBytes(storageRef, newImage?.blob as Blob);
//       getDownloadURL(dbRes.ref).then(res =>
//         upadateUserAvatarWithUploadedImage({
//           path: res,
//           id: dbRes.metadata.name,
//         })
//       );
//         const uploadTaskSnapshot = getStorage()
//         const uploadTask = uploadBytesResumable(
//           storageRef,
//           newImage?.blob as Blob
//         );
//         uploadTask.on("state_changed", snapshot => {
//           const progress =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           // toast.loading(`uploading your image... ${progress.toFixed(2)}%`);
//         });

//       uploadTask
//         .then(() => {
//           getDownloadURL(dbRes.ref).then(res =>
//             upadateUserAvatarWithUploadedImage({
//               path: res,
//               id: dbRes.metadata.name,
//             })
//           );
//         })
//         .catch(err => {
//           toast.error(`(${err}),something went wrong :(`);
//         });
//     } catch (err) {
//       toast.error(`something went wrong :(`);
//     }
//   };

//  */
