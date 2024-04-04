export type db_user_type = {
  is_verified: boolean;
  user_avatar: {
    src: string;
    id: string;
  };
  user_createdAT: string;
  user_email: string;
  user_id: string;
  user_name: string;
  user_phone: string;
  user_role: string;
  user_updatedAT: string;
  user_firstName: string;
  user_lastName: string;
};

export type billing_info_type = {
  billing_info_id: string;
  billing_info_firstName: string;
  billing_info_lastName: string;
  billing_info_email: string;
  billing_info_phone: string;
  billing_info_company_name: string;
  billing_info_country: string;
  billing_info_city: string;
  billing_info_address: string;
  billing_info_zip: string;
  bill_info_createdAT: string;
  bill_info_updatedAT: string;
  user_id: string;
};

export type useCurrentUserType = {
  user_email: string;
  is_verified: boolean;
  user_id: string;
  user_avatar?: string;
  user_name?: string;
  user_role: "customer" | "vip" | "editor" | "admin" | "owner";
  user_updatedAT: Date;
  user_firstName?: string;
  user_lastName?: string;
  user_phone?: string;
};
