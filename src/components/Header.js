import React from "react";
import { NavLink, Link } from "react-router-dom";
import { HiUserCircle } from "react-icons/hi";
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
        <ul className="navmenus-container flex-row-center header-responsive">
          <li>
            <NavLink to="/" exact  className={({ isActive }) => isActive? "active": ''}>
              Home
            </NavLink>
          </li>
          {isLoggedIn ? (
            <LoggedInMenus user={props.user} />
          ) : (
            <NotloggedInMenus />
          )}
        </ul>
      </nav>
    </header>
  );
}

function LoggedInMenus(props) {
  return (
    <>
      <li>
        <NavLink to="/article/new"  className={({ isActive }) => isActive? "active": ''}>
          New Post
        </NavLink>
      </li>
      <li className="flex-row-center">
        <TbSettings />
        <NavLink to="/settings"  className={({ isActive }) => isActive? "active": ''}>
          Settings
        </NavLink>
      </li>
      <li className="flex-row-center">
        <HiUserCircle />
        <NavLink
          to={`/profile/${props.user.username}`}
           className={({ isActive }) => isActive? "active": ''}
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
        <NavLink to="/register" className={({ isActive }) => isActive? "active": ''}>
          Signup
        </NavLink>
      </li>
      <li>
        <NavLink to="/login" className={({ isActive }) => isActive? "active": ''}>
          Signin
        </NavLink>
      </li>
    </>
  );
}
