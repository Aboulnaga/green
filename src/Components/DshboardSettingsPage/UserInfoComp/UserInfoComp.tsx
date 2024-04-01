import EditableInput from "../../Buttons/EditableInput/EditableInput";
import useQueryCurrentUser from "../../../Hooks/useQueryCurrentUser";
import Spinner from "../../Spinner/Spinner";
import UploadImage from "../UploadImage";
import toast, { Toaster } from "react-hot-toast";
import z from "zod";
export default function UserInfoComp() {
  const { isError, isLoading, data: currentUserData } = useQueryCurrentUser();

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

  const checkInfoInputsByZod = (data: any) => {
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
      console.log(res);
    } catch (err) {
      // console.log(err);
      if (err instanceof z.ZodError) {
        err.issues.map(err => {
          toast.error(err.message);
        });
      }
    }
  };

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
          isLoading={isLoading}
        />
      </Spinner>
      <div className="info-form">
        <form onSubmit={handleInfoForm}>
          <EditableInput
            containerClass="user-name-container"
            inputName="userName"
            inputID="info-form-user-name"
            inputLabel="User Name"
            inputType="text"
            inputValue={currentUserData?.user_name}
            readOnlyFeature={true}
          />

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
