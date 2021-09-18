import Form from "./common/form";
import React from "react";
import PageHeader from "./common/pageHeader";
import Joi from "joi";
import userService from "../services/userService";
import { Redirect } from "react-router-dom";

class SignupBiz extends Form {
  state = {
    form: {
      email: "",
      password: "",
      name: "",
    },
  };

  schema = {
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().required().min(6),
    name: Joi.string().required().min(2),
  };

  async whenSubmit() {
    const { form } = this.state;
    const body = { ...form, biz: true };

    try {
      const biz = await userService.createUser(body);
      console.log(body);
      console.log("Created Biz User", biz);

      await userService.login(body.email, body.password);
      window.location = "/create-card";
    } catch ({ response }) {
      console.log({ errors: { response } });
      if (response && response.status === 400) {
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
        <PageHeader title="Business Sign up" />
        <div className="row">
          <div className="col-12">
            <h4>
              <i className="bi bi-person-circle text-success"></i> Create a new
              business account
            </h4>
          </div>
        </div>
        <form onSubmit={this.handleSubmit} autoComplete="off" noValidate>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Business Name")}
          <div className="mt-2">
            {this.renderButtonSubmit("Sign Up Business")}
            {this.renderButtonReset("Reset")}
          </div>
        </form>
      </>
    );
  }
}

export default SignupBiz;
