import { useContext, useState } from "react";
import { NavLink } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Home,
  LayoutDashboard,
  UserPlus,
  Users,
} from "lucide-react";
import { AuthContext } from "../../Context/Context";

const NavDropdown = () => {
  const {user} = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const DropLink = ({ to, icon: Icon, children }) => (
    <li>
      <NavLink
        to={to}
        onClick={() => setIsOpen(false)}
        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-200 hover:bg-white/10 hover:text-white transition-all duration-200 rounded-lg"
      >
        <Icon size={18} />
        {children}
      </NavLink>
    </li>
  );

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 mr-2     text-white  hover:bg-white/20 transition-all"
      >
        <div
          tabIndex={0}
          role="button"
          className="btn p-0 pr-1 btn-ghost lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />{" "}
          </svg>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, x: -100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute -right-50  w-64 origin-top-right rounded-r-xl border border-white/10 bg-[#160B3A]/90 backdrop-blur-xl p-2 shadow-2xl z-[100]"
          >
            <DropLink to="/" icon={Home}>
              Home
            </DropLink>

            {user ? (
              <DropLink to="/dash" icon={LayoutDashboard}>
                Dashboard
              </DropLink>
            ) : (
              <>
                <div className="my-2 h-[1px] bg-white/10" />
                <DropLink to="/auth/employee-registration" icon={UserPlus}>
                  Join as Employee
                </DropLink>
                <DropLink to="/auth/HR-registration" icon={Users}>
                  Join as HR
                </DropLink>
              </>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavDropdown;
