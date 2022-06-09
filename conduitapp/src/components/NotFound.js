import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="pagenotfoundcontainer center">
      <div className="notfound-container">
        <h2 className="text-center">404</h2>
        <h3 className="text-center"> Looks Like You'are Lost</h3>
        <h5> The page you are looking for is not available</h5>
        <div className="center">
          <button className="home-btn">
              <Link to="/">home</Link>
          </button>
        </div>
      </div>
    </section>
  );
}