import { Link, NavLink } from "react-router-dom";
import { routeName } from "../action/routeActionName";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { authUser, logout } = useAuth();

  const activeClass = ({ isActive }) =>
    `transition-colors hover:text-blue-400 ${
      isActive ? "text-blue-400 font-semibold" : "text-white"
    }`;

  return (
    <header className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between">
      {/* Logo / Brand */}
      <Link to="/" className="text-lg font-semibold hover:text-blue-400">
        My App
      </Link>

      {/* Navigation Links */}
      <nav className="flex gap-6">
        {authUser && (
          <>
            <NavLink to={`/${routeName.message}`} className={activeClass}>
              Message
            </NavLink>
            <NavLink to={`/${routeName.profile}`} className={activeClass}>
              Profile
            </NavLink>
            <button
              onClick={logout}
              className="text-white hover:text-red-400 transition-colors"
            >
              Logout
            </button>
          </>
        )}
        {!authUser && (
          <NavLink to={`/${routeName.login}`} className={activeClass}>
            Login
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
