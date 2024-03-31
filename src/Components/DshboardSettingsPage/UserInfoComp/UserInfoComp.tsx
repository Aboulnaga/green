import EditableInput from "../../Buttons/EditableInput/EditableInput";
import useGetUserData from "../../../Hooks/useGetUserData";
import { useEffect, useState } from "react";
import { authUser } from "../../../Config/FireBaseConfig";
import { db_user_type } from "../../../Type/commonType";
import DefAvatarSvg from "../../defSvgProfileImg/DefAvatarSvg";
import Z_imageSchema from "./Z_imageSchema";
import { Toaster, toast } from "react-hot-toast";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  getMetadata,
} from "firebase/storage";
import { storage } from "../../../Config/FireBaseConfig";
import { db } from "../../../Config/FireBaseConfig";
import { collection, updateDoc, doc } from "firebase/firestore";
export default function UserInfoComp() {
  const userId = authUser.currentUser?.uid;
  const userGet = useGetUserData(userId as string);
  const [currentUserData, setCurrentUserData] = useState<db_user_type | null>(
    null
  );
  useEffect(() => {
    userGet.then(res => setCurrentUserData(res));
  }, []);
  const [newImage, setNewImage] = useState<{
    name: string;
    file: File;
    blob: {};
  } | null>(null);

  const handleImage = (e: any) => {
    e.preventDefault();
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
    input.addEventListener("change", e => {
      const file = e.target as HTMLInputElement;
      if (file.files && file.files.length > 0) {
        const newImageFile = file.files[0];
        const newImageName = newImageFile.name;
        const reader = new FileReader();
        reader.onload = () => {
          const arrayBuffer = reader.result;
          const blob = new Blob([arrayBuffer] as BlobPart[], {
            type: newImageFile.type,
          });
          // console.log(blob);

          setNewImage({ name: newImageName, file: newImageFile, blob });
          // ... استخدم Blob هنا ...
          // setNewImage({...newImage,blob : blob});
        };
        reader.readAsArrayBuffer(newImageFile);
      }
    });
  };

  const checkImageByZod = ({
    height,
    width,
  }: {
    height: number;
    width: number;
  }) => {
    const res = Z_imageSchema.safeParse({
      type: newImage?.file.type,
      size: newImage?.file.size,
      dimensions: `${width}x${height}`,
    });

    if (!res.success) {
      toast.error(`${res.error.issues[0].message} :(`);
    }

    if (res.success) {
      uploadImage();
      return true;
    }
  };

  const uploadImage = async () => {
    try {
      const storageRef = ref(
        storage,
        `profile_pic/${currentUserData?.user_id}+${currentUserData?.user_name}+${newImage?.name}`
      );
      deleteUserOldAvatar(
        currentUserData?.user_avatar as { src: string; id: string }
      );
      const dbRes = await uploadBytes(storageRef, newImage?.blob as Blob);
      if (dbRes) {
        // console.log(dbRes);
        getDownloadURL(dbRes.ref).then(res =>
          upadateUserAvatarWithUploadedImage({
            path: res,
            id: dbRes.metadata.name,
          })
        );
      }
    } catch (err) {
      toast.error(`something went wrong :(`);
    }
  };

  const deleteUserOldAvatar = async (avatar: { src: string; id: string }) => {
    const storageRef = ref(storage, `profile_pic/${avatar.id}`);
    const meta = await getMetadata(storageRef);
    console.log(meta);
    if (!meta.name) return;
    try {
      await deleteObject(storageRef);
      return true;
    } catch (err) {
      toast.error(`something went wrong :(`);
    }
  };

  const upadateUserAvatarWithUploadedImage = async ({
    path,
    id,
  }: {
    path: string;
    id: string;
  }) => {
    try {
      const collectionRef = collection(db, "users");
      const docRef = doc(collectionRef, userId as string);
      await updateDoc(docRef, {
        user_avatar: { src: path, id: id },
      });
      toast.success("profile image updated :)");
      setTimeout(() => {
        // window.location.reload();
      }, 2000);
    } catch (e) {
      toast.error(`cant update profile image right now :(`);
    }
  };

  // console.log(currentUserData);
  const handleInfoForm = (e: any) => {
    e.preventDefault();
    const formData: FormData = new FormData(e.target);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const phone = formData.get("phone");
    console.log(firstName, lastName, email, phone);
  };
  return (
    <div className="user-info ">
      <Toaster
        toastOptions={{ duration: 3000 }}
        position="top-center"
        reverseOrder={false}
      />
      <div className="user-img">
        {newImage ? (
          <img
            onLoad={e => {
              const imgTarget = e.target as HTMLImageElement;
              const h = imgTarget.naturalHeight;
              const w = imgTarget.naturalWidth;
              // console.log(imgTarget);
              checkImageByZod({ height: h, width: w });
            }}
            src={URL.createObjectURL(newImage?.file)}
            alt={currentUserData?.user_firstName}
          />
        ) : (
          <>
            {currentUserData?.user_avatar ? (
              <img
                className="user-avatar"
                src={currentUserData?.user_avatar.src}
                alt={currentUserData?.user_name}
              />
            ) : (
              <DefAvatarSvg svgClass="user-avatar-svg" />
            )}
          </>
        )}
        <form>
          <button onClick={handleImage}>Chose Image</button>
        </form>
      </div>
      <div className="info-form">
        <form onSubmit={handleInfoForm}>
          <EditableInput
            containerClass="first-name"
            inputName="firstName"
            inputID="info-form-first-name"
            inputLabel="First Name"
            inputType="text"
            inputValue={currentUserData?.user_firstName}
            readOnlyFeature={true}
          />

          <EditableInput
            inputName="lastName"
            containerClass="last-name"
            inputID="info-form-last-name"
            inputLabel="Last Name"
            inputType="text"
            inputValue={currentUserData?.user_lastName}
            readOnlyFeature={true}
          />

          <EditableInput
            inputName="email"
            containerClass="email"
            inputID="info-form-email"
            inputLabel="Email"
            inputType="email"
            inputValue={currentUserData?.user_email}
            readOnlyFeature={true}
            disableFeature={true}
            inputNotifyMsg="sorry, you can't change your email"
          />

          <EditableInput
            inputName="phone"
            containerClass="phone"
            inputID="info-form-phone"
            inputLabel="Phone"
            inputType="text"
            inputValue={currentUserData?.user_phone}
            readOnlyFeature={true}
          />

          <div className="submit">
            <button type="submit">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
