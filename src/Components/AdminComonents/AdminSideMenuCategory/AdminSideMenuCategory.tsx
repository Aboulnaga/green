import { NavLink } from "react-router-dom";
export default function AdminSideMenuCategory({
  catTitle,
  catList,
}: {
  catTitle: string;
  catList: { url: string; title: string }[];
}) {
  return (
    <div className="section">
      <h3>{catTitle}</h3>
      {catList ? (
        <ul>
          {catList.map((link, i) => (
            <li key={i}>
              <NavLink end to={`${link.url}`}>
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
