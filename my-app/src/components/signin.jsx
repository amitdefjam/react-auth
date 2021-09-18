import Joi from "joi";
import React from "react";
import userService from "../services/userService";
import Form from "./common/form";
import PageHeader from "./common/pageHeader";
import { Redirect } from "react-router-dom";

class Signin extends Form {
  state = {
    form: {
      email: "",
      password: "",
    },
  };

  schema = {
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().required().min(6),
  };

  async whenSubmit() {
    const { email, password } = this.state.form;
    try {
      await userService.login(email, password);
      window.location = "/"; //when logged on redirecting to Home page
    } catch ({ response }) {
      if (response && response.status === 400 /* bad req */) {
        this.setState({ errors: { email: response.data } });
      }
    }
  }

  render() {
    if (userService.getCurrentUser()) {
      return <Redirect to="/" />;
    }
    return (
      <>
        <PageHeader title="Sign in to Business Legit" />
        <div className="row">
          <div className="col-12">
            <h4>
              <i className="bi bi-box-arrow-in-right text-success"></i> Log in.
            </h4>
          </div>
        </div>
        <form onSubmit={this.handleSubmit} autoComplete="off" noValidate>
          <div className="">
            {this.renderInput("email", "Email", "email")}
            {this.renderInput("password", "Password", "password")}
            <div className="mt-2">
              {this.renderButtonSubmit("Submit")}
              {this.renderButtonReset("Reset")}
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default Signin;
