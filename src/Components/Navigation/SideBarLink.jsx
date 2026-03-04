import { NavLink } from "react-router";

const SidebarLink = ({ to, icon, label, setIsOpen }) => (
  <li>
    <NavLink
      to={to}
      onClick={() => window.innerWidth < 1024 && setIsOpen(false)} 
      className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-xl transition-all ${
          isActive
            ? "bg-sky-500 text-white shadow-lg shadow-sky-200"
            : "hover:bg-sky-50 hover:text-sky-700 text-gray-500"
        }`
      }
    >
      <span className="text-xl">{icon}</span>
      <span className="text-sm">{label}</span>
    </NavLink>
  </li>
);
export default SidebarLink