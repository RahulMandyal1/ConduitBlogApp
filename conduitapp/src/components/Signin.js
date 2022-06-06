import React, { Component } from "react";
import { loginURL } from "../utils/constant";
import { validateEmail } from "../utils/emailValidation";
import { lengthValidation } from "../utils/lengthValidation";
export default class Signin extends Component {
  state = {
    email: "",
    password: "",
    errors: {
      email: "",
      password: "",
    },
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    //validate the email
    if (name === "email") {
      this.setState({
        errors: {
          email: validateEmail(value),
        },
      });
    }
    //validate   the password
    if (name === "password") {
      console.log(value);
      this.setState({
        errors: {
          password: lengthValidation(name, value),
        },
      });
    }

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let { username, password, email } = this.state;
    console.log(username, password, email);
    fetch(loginURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: { email, password } }),
    })
      .then((res) => {
        if (!res.ok) {
          res.json().then((data) =>
            this.setState((previousState) => {
              return {
                ...previousState,
                errors: {
                  ...previousState.errors,
                  email: "email or password is incorrect !!",
                },
              };
            })
          );
        }
        return res.json();
      })
      .then((data) => {
        console.log(
          " this is the data coming  as a response from the api",
          data
        );
      })
      .catch((error) => {
        console.log("somethign went wrong here ...");
      });
  };

  render() {
    const { email, password } = this.state.errors;
    return (
      <section className="form-container container">
        <div className=" center user-form">
          <header>
            <h1 className="text-center">Sign In</h1>
            <h5 className="text-center">Need an account?</h5>
          </header>
          <form className="userinput-container">
            <div className="form-group">
              <input
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <span className="error">{email}</span>
            </div>
            <div className="form-group">
              <input
                placeholder="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <span className="error">{password}</span>
            </div>
            <div className="flex-end">
              <button
                className="btn"
                disabled={email || password}
                onClick={this.handleSubmit}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  }
}
