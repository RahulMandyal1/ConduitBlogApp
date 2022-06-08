import React from "react";
import { NavLink, Link } from "react-router-dom";
<<<<<<< Updated upstream
export default function Header() {
=======
import { TbSettings } from "react-icons/tb";
import { HiUserCircle } from "react-icons/hi";

export default function Header(props) {
  const isLoggedIn = props.isLoggedIn;
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
            <NavLink to="/" exact activeClassName="activelink">
              Home
            </NavLink>
          </li>
          {isLoggedIn ? <LoggedInMenus  user={props.user}/> : <NotloggedInMenus />}
>>>>>>> Stashed changes
        </ul>
      </nav>
    </header>
  );
}
<<<<<<< Updated upstream
=======

function LoggedInMenus(props) {
  return (
    <>
      <li>
        <NavLink to="/article/new" activeClassName="activelink">
          New Post
        </NavLink>
      </li>
      <li className="flex-row-center">
        <TbSettings />
        <NavLink to="/settings" activeClassName="activelink">
          Settings
        </NavLink>
      </li>
      <li className="flex-row-center">
            <HiUserCircle />
            <NavLink
              to={`/profile/${props.user.username}`}
              activeClassName="activelink"
            >
              {props.user.username}
            </NavLink>
          </li>
    </>
  );
}

function NotloggedInMenus() {
  return (
    <>
      <li>
        <NavLink to="/register" activeClassName="activelink">
          Signup
        </NavLink>
      </li>
      <li>
        <NavLink to="/login" activeClassName="activelink">
          Signin
        </NavLink>
      </li>
    </>
  );
}
>>>>>>> Stashed changes
