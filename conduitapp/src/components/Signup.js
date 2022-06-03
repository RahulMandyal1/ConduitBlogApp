import React from "react";
export default function Signup() {
  return (
    <section className="form-container container">
      <div className=" center user-form">
        <header>
          <h1 className="text-center">Sign up</h1>
          <h5 className="text-center">Have an account?</h5>
        </header>
        <form className="userinput-container">
          <div className="form-group">
            <input placeholder="Username" />
          </div>
          <div className="form-group">
            <input placeholder="Email" />
          </div>
          <div className="form-group">
            <input placeholder="password" />
          </div>
          <div className="flex-end">
            <button className="btn">Sign up</button>
          </div>
        </form>
      </div>
    </section>
  );
}
