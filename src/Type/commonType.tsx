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
