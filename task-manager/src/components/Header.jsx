
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">
        Task Manager
      </Link>

      <nav>
        <NavLink to="/" end>
          Task Manager
        </NavLink>

        <NavLink to="/about">
          О приложении
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
