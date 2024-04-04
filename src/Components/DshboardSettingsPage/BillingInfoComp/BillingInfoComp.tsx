import { useEffect, useState } from "react";
import EditableInput from "../../Buttons/EditableInput/EditableInput";
import { Toaster, toast } from "react-hot-toast";
import { useCountriesApi, useCitiesApi } from "./useCountriesApi";
import z from "zod";
import FormErrorMsg from "../../FormErrorMsg/FormErrorMsg";
import { FormErrorType } from "../../FormErrorMsg/FormErrorMsg";
import { setDoc, doc, serverTimestamp, collection } from "firebase/firestore";
import useQueryCurrentUser from "../../../Hooks/useQueryCurrentUser";
import { db } from "../../../Config/FireBaseConfig";
import useQueryBillingInfo from "../../../Hooks/useQueryBillingInfo";

export default function BillingInfoComp() {
  const { data: currentUser } = useQueryCurrentUser();
  const userId = currentUser?.user_id;
  const { data: countriesData } = useCountriesApi();
  const [defaultCountry, setDefaultCountry] = useState("EG");
  const [defaultCity, setDefaultCity] = useState("alex");
  const { data: citiesData, refetch } = useCitiesApi(defaultCountry);
  const [formError, setFormError] = useState<FormErrorType | null>(null);
  const [buttonLoading, setButtonLoading] = useState(false);

  const { data: billingInfoData, isError } = useQueryBillingInfo(
    userId as string
  );

  // console.log(billingInfoData);

  useEffect(() => {
    if (countriesData?.error || citiesData?.error) {
      toast.error("can not fetch countries or cities right now");
    }
  }, [countriesData, citiesData]);

  useEffect(() => {
    refetch();
  }, [defaultCountry]);

  useEffect(() => {
    if (isError) {
      toast.error("can not fetch billing info right now");
    }
  }, [isError]);

  useEffect(() => {
    if (billingInfoData) {
      setDefaultCountry(billingInfoData.billing_info_country);
      setDefaultCity(billingInfoData.billing_info_city);
    }
  }, [billingInfoData]);

  const mapSelectData = (data: any) => {
    if (data?.success) {
      return data?.success.data.map((x: { name: string; iso2: string }) => {
        return (
          <option key={x.name} value={x.iso2}>
            {x.name}
          </option>
        );
      });
    }
  };

  const handleForm = async (e: any) => {
    e.preventDefault();
    const formData: FormData = new FormData(e.target);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      company: formData.get("company"),
      address: formData.get("street-address"),
      city: formData.get("city"),
      country: formData.get("country"),
      zipCode: formData.get("zipCode"),
      phone: formData.get("phone"),
      email: formData.get("email"),
    };

    const checkRes = await checkInputsByZod(data);
    if (!checkRes) return;
    const res = await setBillingInfo(checkRes);
    if (!res) return;
    setFormError(null);

    // console.log(checkRes);
  };

  const checkInputsByZod = async (data: any) => {
    setButtonLoading(true);
    const schema = z.object({
      firstName: z
        .string()
        .min(3, { message: "at least 3" })
        .max(50, { message: "at most 50" }),
      lastName: z
        .string()
        .min(3, { message: "at least 3" })
        .max(50, { message: "at most 50" }),
      email: z.string().email({ message: "Invalid email address" }),
      company: z.string().min(0).max(50, { message: "at most 50" }),
      address: z.string().min(10, { message: "required" }),
      city: z.string().min(1, { message: "required" }),
      country: z.string().min(1, { message: "required" }),
      zipCode: z.string().min(4, { message: " at least 4" }),
      phone: z
        .string()
        .min(11, { message: "Invalid, at least 11 characters" })
        .max(15, { message: "Invalid, at most 15 characters" })
        .regex(/^[0-9]+$/, { message: "Invalid,numbers only" }),
    });
    try {
      const res = schema.parse(data);
      // console.log(res);
      if (res) {
        // console.log(res);
        return res;
      }
    } catch (errors) {
      // console.log(err);
      setButtonLoading(false);
      toast.error(`Error, invalid data :(`);

      if (errors instanceof z.ZodError) {
        const mapErrors = errors.errors.map((err: any) => {
          return { error: err.message, path: err.path[0] };
        });

        setFormError(mapErrors);
      }
    }
  };

  const setBillingInfo = async (data: any) => {
    setButtonLoading(true);
    try {
      const collectionRef = collection(db, "billing_info");
      const docRef = doc(collectionRef, userId);
      const allData = {
        billing_info_firstName: data.firstName,
        billing_info_lastName: data.lastName,
        billing_info_email: data.email,
        billing_info_phone: data.phone,
        billing_info_company_name: data.company,
        billing_info_country: data.country,
        billing_info_city: data.city,
        billing_info_address: data.address,
        billing_info_zip: data.zipCode,
        bill_info_createdAT: serverTimestamp(),
        bill_info_updatedAT: serverTimestamp(),
        user_id: userId,
      };

      await setDoc(docRef, allData);

      toast.success("billing info updated :)");
      setButtonLoading(false);
      return true;

      // console.log(allData);
    } catch {
      setButtonLoading(false);
      toast.error("something went wrong in setting billing info :(");
      return false;
    }
  };

  return (
    <>
      <div className="billing-info settings-page">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="billing-info-form">
          <form onSubmit={handleForm}>
            {/* row 1 */}
            <div className="row-1">
              <div>
                <EditableInput
                  inputName="firstName"
                  containerClass="first-name"
                  inputID="billFirstName"
                  inputLabel="First Name"
                  inputType="text"
                  inputValue={billingInfoData?.billing_info_firstName}
                  readOnlyFeature={true}
                />
                <FormErrorMsg
                  errors={formError}
                  path="firstName"
                  userClass="error-bill-info-first-name"
                />
              </div>

              <div>
                <EditableInput
                  inputName="lastName"
                  containerClass="last-name"
                  inputID="billLastName"
                  inputLabel="Last Name"
                  inputType="text"
                  inputValue={billingInfoData?.billing_info_lastName}
                  readOnlyFeature={true}
                />
                <FormErrorMsg
                  errors={formError}
                  path="lastName"
                  userClass="error-bill-info-last-name"
                />
              </div>

              <div>
                <EditableInput
                  inputName="company"
                  containerClass="company"
                  inputID="company"
                  inputType="text"
                  inputValue={billingInfoData?.billing_info_company_name}
                  readOnlyFeature={true}
                >
                  Company Name <span>(optional)</span>
                </EditableInput>

                <FormErrorMsg
                  errors={formError}
                  path="company"
                  userClass="error-bill-info-company"
                />
              </div>
            </div>

            {}

            <div className="row-2">
              <div>
                <EditableInput
                  inputName="street-address"
                  containerClass="street-address"
                  inputID="street-address"
                  inputType="text"
                  inputValue={billingInfoData?.billing_info_address}
                  readOnlyFeature={true}
                  inputLabel=" Address"
                />
                <FormErrorMsg
                  errors={formError}
                  path="address"
                  userClass="error-bill-info-address"
                />
              </div>
            </div>

            {/* row 3  */}

            <div className="row-3">
              <div className="country">
                <label htmlFor="country">Country / Region</label>
                <select
                  value={defaultCountry}
                  onChange={e => setDefaultCountry(e.target.value)}
                  name="country"
                  id="country"
                >
                  {mapSelectData(countriesData)}
                </select>
              </div>

              <div className="stats">
                <label htmlFor="stats">City</label>
                <select
                  onChange={e => setDefaultCity(e.target.value)}
                  value={defaultCity}
                  name="city"
                  id="stats"
                >
                  {mapSelectData(citiesData)}
                </select>
              </div>

              <div>
                <EditableInput
                  inputName="zipCode"
                  containerClass="zip-code"
                  inputID="zip-code"
                  inputType="text"
                  inputValue={billingInfoData?.billing_info_zip}
                  readOnlyFeature={true}
                  inputLabel="Zip Code"
                />
              </div>
              <FormErrorMsg
                errors={formError}
                path="zipCode"
                userClass="error-bill-info-zip-code"
              />
            </div>

            {/* row 4 */}
            <div>
              <div className="row-4">
                <EditableInput
                  inputName="phone"
                  containerClass="phone"
                  inputID="billPhone"
                  inputType="text"
                  inputValue={billingInfoData?.billing_info_phone}
                  readOnlyFeature={true}
                  inputLabel="Phone"
                />
                <FormErrorMsg
                  errors={formError}
                  path="phone"
                  userClass="error-bill-info-phone"
                />
              </div>

              <div>
                <EditableInput
                  inputName="email"
                  containerClass="email"
                  inputID="billEmail"
                  inputType="email"
                  inputValue={billingInfoData?.billing_info_email}
                  readOnlyFeature={true}
                  inputLabel="Email"
                />

                <FormErrorMsg
                  errors={formError}
                  path="email"
                  userClass="error-bill-info-email"
                />
              </div>
            </div>

            {/* row 5 */}
            <div className="row-5">
              <button
                onClick={e => {
                  if (buttonLoading) {
                    e.preventDefault();
                    toast.error("please wait...");
                    return;
                  }
                  refetch();
                }}
              >
                {buttonLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
