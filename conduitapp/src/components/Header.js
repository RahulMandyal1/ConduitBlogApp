import React from "react";
import { NavLink, Link } from "react-router-dom";
export default function Header() {
  return (
    <header className="navigation-container">
      <nav className="flex-row-center">
        <div className="logo-container">
          <Link to="/" className="logo">
            Conduit
          </Link>
        </div>
        <ul className="navmenus-container flex-row-center">
          <li>
            <NavLink to="/" exact activeClassName="active-menu">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/register" activeClassName="active-menu">
              Signin
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" activeClassName="active-menu">
              Signup
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
