import { NavLink, Link } from "react-router-dom";
import Logo from "./Logo";

import styles from "./PageNav.module.css";
import DarkModeButten from "./DarkModeButten";

function PageNav() {
  return (
    <div>
      <nav className={styles.nav}>
        <Link to="/">
          <Logo />
        </Link>
        <ul>
          <li>
            <NavLink to="/login" className={styles.btn}>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink>
              <DarkModeButten />
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default PageNav;
