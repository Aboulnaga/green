import EditableInput from "../../Buttons/EditableInput/EditableInput";
import useQueryCurrentUser from "../../../Hooks/useQueryCurrentUser";
import Spinner from "../../Spinner/Spinner";
import UploadImage from "../UploadImage";
import toast, { Toaster } from "react-hot-toast";
import z from "zod";
import FormErrorMsg from "../../FormErrorMsg/FormErrorMsg";
import { FormErrorType } from "../../FormErrorMsg/FormErrorMsg";
import { useEffect, useState } from "react";
import { db } from "../../../Config/FireBaseConfig";
import {
  updateDoc,
  doc,
  serverTimestamp,
  collection,
} from "firebase/firestore";
export default function UserInfoComp() {
  const {
    isError,
    isLoading,
    data: currentUserData,
    refetch,
  } = useQueryCurrentUser();
  const [formError, setFormError] = useState<FormErrorType | null>(null);

  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isError]);
  // console.log(currentUserData);
  const handleInfoForm = (e: any) => {
    e.preventDefault();
    const formData: FormData = new FormData(e.target);

    const data = {
      user_name: formData.get("userName"),
      user_firstName: formData.get("firstName"),
      user_lastName: formData.get("lastName"),
      user_email: formData.get("email"),
      user_phone: formData.get("phone"),
    };

    checkInfoInputsByZod(data);
  };

  const checkInfoInputsByZod = async (data: any) => {
    const schema = z.object({
      user_name: z
        .string()
        .min(5, { message: "User name must be at least 5 characters long" })
        .max(20, { message: "User name must be at most 20 characters long" }),
      user_firstName: z
        .string()
        .min(3, { message: "First name must be at least 3 characters long" })
        .max(20, { message: "First name must be at most 20 characters long" }),
      user_lastName: z
        .string()
        .min(5, { message: "Last name must be at least 3 characters long" })
        .max(20, { message: "Last name must be at most 20 characters long" }),
      user_email: z.string().email({ message: "Invalid email address" }),
      user_phone: z
        .string()
        .min(11, { message: "Invalid, must be at least 11 characters" })
        .max(15, { message: "Invalid, must be at most 15 characters" })
        .regex(/^[0-9]+$/, { message: "Invalid,must be numbers only" }),
    });
    try {
      const res = schema.parse(data);

      if (res) {
        setFormError(null);

        await updateUserDoc({
          user_name: res.user_name,
          user_firstName: res.user_firstName,
          user_lastName: res.user_lastName,
          user_email: res.user_email,
          user_phone: res.user_phone,
        });

        // console.log(updateUser);

        toast.success("User updated successfully");

        refetch();

        // setTimeout(() => {
        //   window.location.reload();
        // }, 3000);
      }

      // console.log(res);
    } catch (err) {
      // toast.error(err.message);
      // console.log(err);
      if (err instanceof z.ZodError) {
        const mapErrors = err.issues.map(err => {
          return { path: err.path[0], error: err.message } as {
            path: string;
            error: string;
          };
        });
        setFormError(mapErrors);
      }
    }
  };

  const updateUserDoc = async ({
    user_name,
    user_firstName,
    user_lastName,
    user_email,
    user_phone,
  }: {
    user_name: string;
    user_firstName: string;
    user_lastName: string;
    user_email: string;
    user_phone: string;
  }) => {
    // console.log(user_firstName, user_lastName, user_phone, user_email);

    try {
      const usersCollection = collection(db, "users");
      const userDoc = doc(usersCollection, currentUserData?.user_id);
      await updateDoc(userDoc, {
        user_name,
        user_firstName,
        user_lastName,
        user_email,
        user_phone,
        user_updatedAT: serverTimestamp(),
      });

      return true;
    } catch {
      toast.error(`Error, updating user data :(`);
    }
  };

  // console.log(formError);
  return (
    <div className="user-info ">
      <Toaster
        toastOptions={{ duration: 3000 }}
        position="top-center"
        reverseOrder={false}
      />
      <Spinner isLoading={isLoading}>
        <UploadImage
          currentUserData={currentUserData as any}
          isError={isError}
        />
      </Spinner>
      <div className="info-form">
        <form onSubmit={handleInfoForm}>
          <div>
            <EditableInput
              containerClass="user-name-container"
              inputName="userName"
              inputID="info-form-user-name"
              inputLabel="User Name"
              inputType="text"
              inputValue={currentUserData?.user_name}
              readOnlyFeature={true}
            />
            <FormErrorMsg
              userClass="user-name-error user-info-error"
              errors={formError}
              path="user_name"
            />
          </div>

          <div>
            <EditableInput
              containerClass="first-name"
              inputName="firstName"
              inputID="info-form-first-name"
              inputLabel="First Name"
              inputType="text"
              inputValue={currentUserData?.user_firstName}
              readOnlyFeature={true}
            />
            <FormErrorMsg
              userClass="user-name-first-name-error user-info-error"
              errors={formError}
              path="user_firstName"
            />
          </div>

          <div>
            <EditableInput
              inputName="lastName"
              containerClass="last-name"
              inputID="info-form-last-name"
              inputLabel="Last Name"
              inputType="text"
              inputValue={currentUserData?.user_lastName}
              readOnlyFeature={true}
            />
            <FormErrorMsg
              userClass="user-last-name-error user-info-error"
              errors={formError}
              path="user_lastName"
            />
          </div>

          <div>
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
            <FormErrorMsg
              userClass="user-email-error user-info-error"
              errors={formError}
              path="user_email"
            />
          </div>

          <div>
            <EditableInput
              inputName="phone"
              containerClass="phone"
              inputID="info-form-phone"
              inputLabel="Phone"
              inputType="text"
              inputValue={currentUserData?.user_phone}
              readOnlyFeature={true}
            />
            <FormErrorMsg
              userClass="user-phone-error user-info-error"
              errors={formError}
              path="user_phone"
            />
          </div>

          <div className="submit">
            <button type="submit">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
