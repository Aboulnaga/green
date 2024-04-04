import { useEffect, useState } from "react";
import DefAvatarSvg from "../defSvgProfileImg/DefAvatarSvg";
import Z_imageSchema from "./UserInfoComp/Z_imageSchema";
import { toast } from "react-hot-toast";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../Config/FireBaseConfig";
import { db } from "../../Config/FireBaseConfig";
import { updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db_user_type } from "../../Type/commonType";
import { useRef } from "react";
import OpacitySpinner from "../OpacitySpinner/OpacitySpinner";

type ImageDimensionsType = {
  width: number;
  height: number;
  size: number;
  type: string;
};
export default function UploadImage({
  isError,
  currentUserData,
}: {
  isError: boolean;
  currentUserData: db_user_type;
}) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [isUploading, setUploading] = useState(false);
  useEffect(() => {
    if (isError) {
      toast.error("something went wrong right now, with the server!");
    }
  }, [isError]);

  const handeleUploadNewProfileImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpg, image/jpeg, image/png";
    input.style.display = "none";
    input.click();
    input.addEventListener("change", e => {
      const inputFle = e.target as HTMLInputElement;
      const imageAsFile = inputFle.files?.[0];
      if (imageAsFile) {
        const reader = new FileReader();
        reader.onload = () => {
          const arrayBuffer = reader.result;
          const blob = new Blob([arrayBuffer] as BlobPart[], {
            type: imageAsFile.type,
          });
          const imageUrl = URL.createObjectURL(blob);
          imageRef.current!.src = imageUrl;

          /******************************************************************** */
          /*************************Convert Image to Blob*********************** */
          /******************************************************************** */
          ////////////////// all logic here for uploading image
          ///////////////////////////////////////////////////////////////////////
          const imageLogic = async () => {
            imageRef.current?.blur();
            setUploading(true);
            setTimeout(() => {
              toast.success("preparing image to upload...");
            }, 500);

            try {
              const details = await getImageDetails(imageUrl, imageAsFile);
              if (!details) return;
              const checkByZod = checkImageByZod({
                height: details.height,
                width: details.width,
                type: details.type,
                size: details.size,
              });
              if (!checkByZod) return;
              const oldImageId = currentUserData.user_avatar.id;
              const deleteOldImage = await deleteImage(oldImageId);
              // console.log(deleteOldImage);
              const uplaodImage = await uploadImage({
                imageName: imageAsFile.name,
                imageBlob: blob,
              });
              if (!uplaodImage) return;
              const newImageUrl = await getDownloadURL(uplaodImage?.ref);
              if (!newImageUrl) return;
              await updateDoc(doc(db, "users", currentUserData.user_id), {
                user_avatar: {
                  src: newImageUrl,
                  id: uplaodImage.metadata.name,
                },
                user_updatedAT: serverTimestamp(),
              });
              setUploading(false);
              toast.success("Image uploaded successfully");
              setTimeout(() => {
                window.location.reload();
              }, 2000);
              // console.log(newImageUrl);

              ////////////////////////////////////// end of logic try
            } catch (err) {
              // console.log("image logic error", err);
              throw new Error("image logic error" + err);
            }
          };

          imageLogic();

          ////////////////// all logic end here
          ///////////////////////////////////////////////////////////////////////
        };
        reader.readAsArrayBuffer(imageAsFile);
      }
    });
  };

  const getImageDetails = async (
    imageUrl: string,
    imageAsFile: File
  ): Promise<ImageDimensionsType> => {
    const img = new Image();
    img.src = imageUrl;
    return new Promise(resolve => {
      img.onload = () => {
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight,
          size: imageAsFile.size,
          type: imageAsFile.type,
        });
      };
    });
  };

  const checkImageByZod = ({
    height,
    width,
    type,
    size,
  }: {
    height: number;
    width: number;
    type: string;
    size: number;
  }) => {
    // console.log(height, width, type, size);
    const res = Z_imageSchema.safeParse({
      type,
      size,
      dimensions: `${width}x${height}`,
    });

    if (!res.success) {
      toast.error(`${res.error.issues[0].message} :(`);
      return false;
    }

    return true;
  };

  const deleteImage = async (imageId: string) => {
    try {
      if (!imageId) return;
      const storageRef = ref(storage, `profile_pic/${imageId}`);
      const isImage = await getDownloadURL(storageRef);
      if (!isImage) return;
      if (isImage) {
        await deleteObject(storageRef);
        await updateDoc(doc(db, "users", currentUserData?.user_id), {
          user_avatar: {
            src: "",
            id: "",
          },
        });
      }
    } catch {
      toast.error(`Error, deleting image :(`);
    }
  };

  const uploadImage = async ({
    imageName,
    imageBlob,
  }: {
    imageName: string;
    imageBlob: Blob;
  }) => {
    try {
      //   const storage = getStorage();
      const storageRef = ref(
        storage,
        `profile_pic/${currentUserData?.user_id}-${imageName}`
      );

      const dbRes = await uploadBytes(storageRef, imageBlob);
      return dbRes;
    } catch (err) {
      toast.error(`Error, uploading image :(`);
    }
  };

  return (
    <div className="user-img">
      <OpacitySpinner isLoading={isUploading}>
        {currentUserData?.user_avatar.src ? (
          <img
            ref={imageRef}
            className="user-avatar"
            src={currentUserData?.user_avatar.src}
            alt={currentUserData?.user_name}
          />
        ) : (
          <DefAvatarSvg svgClass="user-avatar-svg" />
        )}
      </OpacitySpinner>
      <form>
        <button
          style={
            isUploading
              ? {
                  cursor: "progress",
                }
              : {}
          }
          onClick={e => {
            e.preventDefault();
            if (isUploading) {
              toast.error("cant upload image during upload process :(");
            }
            if (!isUploading) {
              handeleUploadNewProfileImage();
            }
          }}
        >
          Chose Image
        </button>
      </form>
    </div>
  );
}
