import React, { Component } from "react";
import Loader from "./Loader";
import { lengthValidation } from "../utils/validation";
import { validateEmail } from "../utils/validation";
import { userVerifyURL } from "../utils/constant";
export default class Setting extends Component {
  state = {
    user: {
      username: this.props.user.username,
      image: this.props.user.bio,
      bio: this.props.user.image,
      email: this.props.user.email,
      password: this.props.user.password,
    },
    errors: {
      username: "",
      image: "",
      bio: "",
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
      this.setState({
        errors: {
          password: lengthValidation(name, value),
        },
      });
    }
    //validate  username
    if (name === "username") {
      this.setState({
        errors: {
          username: lengthValidation(name, value),
        },
      });
    }

    // also change the state once the user updated any fields
    this.setState((previousState) => {
      return {
        ...previousState,
        user: {
          ...previousState.user,
          [name]: value,
        },
      };
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    fetch(userVerifyURL, {
      method: "PUT",
      headers: {
        authorization: `Token ${this.props.user.token}`,
      },
      body: JSON.stringify({ user: this.state.user }),
    })
      .then((res) => res.json())
      .then((user) => {
        console.log(user);
      });
  };

  render() {
    const { email, password, image, bio, username } = this.state.errors;
    return (
      <section className="form-container container">
        <div className="user-form center">
          <form className="userinput-container">
            <div className="form-group">
              <input
                placeholder="URL of profile picture"
                name="image"
                onChange={this.handleChange}
                value={this.state.user.image}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="Username"
                name="username"
                onChange={this.handleChange}
                value={this.state.user.username}
              />
              <span className="error">{username}</span>
            </div>
            <div className="form-group">
              <textarea
                placeholder="Short bio about you"
                name="bio"
                onChange={this.handleChange}
                value={this.state.user.bio}
                rows="5"
              />
              <span className="error">{bio}</span>
            </div>
            <div className="form-group">
              <input
                placeholder="Email"
                name="email"
                value={this.state.user.email}
                onChange={this.handleChange}
              />
              <span className="error">{email}</span>
            </div>
            <div className="form-group">
              <input
                placeholder="New Password"
                name="password"
                value={this.state.user.password}
                onChange={this.handleChange}
              />
              <span className="error">{password}</span>
            </div>
            <div className="flex-end">
              <button
                className="btn"
                disabled={password || username || email}
                onClick={this.handleSubmit}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  }
}
