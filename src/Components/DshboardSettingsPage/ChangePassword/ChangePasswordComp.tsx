import EditableInput from "../../Buttons/EditableInput/EditableInput";
import { signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import useQueryCurrentUser from "../../../Hooks/useQueryCurrentUser";
import FormErrorMsg from "../../FormErrorMsg/FormErrorMsg";
import z from "zod";
import { useRef, useState } from "react";
import { FormErrorType } from "../../FormErrorMsg/FormErrorMsg";
import { authUser } from "../../../Config/FireBaseConfig";
import toast from "react-hot-toast";
export default function ChangePasswordComp() {
  const { data: currentUser } = useQueryCurrentUser();
  const userEmail = currentUser?.user_email;
  const formRef = useRef<HTMLFormElement>(null);
  const [changingPass, setChangingPass] = useState(false);

  const [formError, setFormError] = useState<FormErrorType | null>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setChangingPass(true);
    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmNewPassword = formData.get("confirmPassword") as string;

    const data = {
      currentPassword,
      newPassword,
      confirmNewPassword,
    };

    const checkByZod = await checkPasswordByZod(data);
    if (!checkByZod) return;
    const matchPasswords = newPassword === confirmNewPassword;
    if (!matchPasswords) {
      setFormError([
        { error: "passwords do not match", path: "newPassword" },
        { error: "passwords do not match", path: "confirmNewPassword" },
      ]);
      setChangingPass(false);
      return;
    }
    setFormError(null);

    const checkDb = await checkPasswordByDb(
      currentPassword,
      userEmail as string
    );

    if (!checkDb) return;

    const changePass = await changePassword(newPassword);

    if (!changePass) return;
    formRef.current?.reset();
    setChangingPass(false);
    // console.log(changePass);
  };

  const checkPasswordByZod = async (data: any) => {
    const schema = z
      .object({
        currentPassword: z
          .string()
          .min(6, "password must be at least 6 characters")
          .max(50, "password must be at most 50 characters"),
        newPassword: z
          .string()
          .min(6, "password must be at least 6 characters")
          .max(50, "password must be at most 50 characters"),
        confirmNewPassword: z
          .string()
          .min(6, "password must be at least 6 characters")
          .max(50, "password must be at most 50 characters"),
      })
      .safeParse(data);

    if (schema.success) {
      return schema.data;
    }

    if (!schema.success) {
      const mapErrors = schema.error.issues.map(x => {
        return { error: x.message, path: x.path[0] };
      }) as FormErrorType;
      setChangingPass(false);
      setFormError(mapErrors);
    }
  };

  const checkPasswordByDb = async (
    currentPassword: string,
    userEmail: string
  ) => {
    try {
      const user = await signInWithEmailAndPassword(
        authUser,
        userEmail,
        currentPassword
      );

      return user;
    } catch {
      //   console.log(err);
      toast.error(`invalid password:(`);
      setChangingPass(false);
      return false;
    }
  };

  const changePassword = async (newPassword: string) => {
    try {
      await updatePassword(authUser.currentUser!, newPassword);
      toast.success("Password changed successfully");
      return true;
    } catch (e) {
      console.log(e);
      toast.error(`Error, updating user data :(`);
      setChangingPass(false);
      return false;
    }
  };

  //   console.log(formError);

  return (
    <div className="password-form">
      <form onSubmit={handleSubmit} ref={formRef}>
        {/* row 1 */}
        <div className="row-1">
          <div>
            <EditableInput
              inputName="currentPassword"
              containerClass="current-password"
              inputID="current-password"
              inputLabel="Current Password"
              inputType="password"
              inputValue={""}
              readOnlyFeature={true}
            />

            <FormErrorMsg
              errors={formError}
              userClass="current-password"
              path="currentPassword"
            />
          </div>
        </div>

        {/* row 2 */}
        <div className="row-2">
          <div>
            <EditableInput
              inputName="newPassword"
              containerClass="new-password"
              inputID="new-password"
              inputLabel="New Password"
              inputType="password"
              inputValue={""}
              readOnlyFeature={true}
            />

            <FormErrorMsg
              errors={formError}
              userClass="new-password"
              path="newPassword"
            />
          </div>

          <div>
            <EditableInput
              inputName="confirmPassword"
              containerClass="confirm-password"
              inputID="confirm-password"
              inputLabel="Confirm Password"
              inputType="password"
              inputValue={""}
              readOnlyFeature={true}
            />

            <FormErrorMsg
              errors={formError}
              userClass="confirm-password"
              path="confirmNewPassword"
            />
          </div>
        </div>

        {/* row 3 */}
        <div className="row-3">
          <div className="submit">
            <button
              onClick={e => {
                if (changingPass) {
                  e.preventDefault();
                  toast.error("please wait...");
                  return;
                }
              }}
              type="submit"
            >
              {changingPass ? "Changing..." : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
