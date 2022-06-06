import React from "react";
import { NavLink, Link } from "react-router-dom";
import { TbSettings } from "react-icons/tb";
export default function Header(props) {
  const isLoggedIn = props.isLoggedIn;
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
            <NavLink to="/" exact activeClassName="active-link">
              Home
            </NavLink>
          </li>
          {isLoggedIn ? <LoggedInMenus /> : <NotloggedInMenus />}
        </ul>
      </nav>
    </header>
  );
}

function LoggedInMenus() {
  return (
    <>
      <li>
        <NavLink to="/newpost" activeClassName="active-link">
          New Post
        </NavLink>
      </li>
      <li className="flex-row-center">
        <TbSettings />
        <NavLink to="/Settings" activeClassName="active-link">
          Settings
        </NavLink>
      </li>
    </>
  );
}

function NotloggedInMenus() {
  return (
    <>
      <li>
        <NavLink to="/register" activeClassName="active-link">
          Signup
        </NavLink>
      </li>
      <li>
        <NavLink to="/login" activeClassName="active-link">
          Signin
        </NavLink>
      </li>
    </>
  );
}
