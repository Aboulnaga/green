import AdminSideMenuCategory from "../AdminSideMenuCategory/AdminSideMenuCategory";
export default function AdminSideMenu() {
  return (
    <div>
      AdminSideMenu
      <AdminSideMenuCategory
        catTitle="status"
        catList={[{ url: "", title: "link1" }]}
      />
    </div>
  );
}
