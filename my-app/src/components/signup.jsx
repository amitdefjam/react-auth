import React from "react";
import PageHeader from "./common/pageHeader";
import Form from "./common/form";
import Joi from "joi";
import { userService, createUser } from "../services/userService";
import { toast } from "react-toastify";
import { Redirect } from "react-router";
class Signup extends Form {
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
    console.log(this.state.form);
    const { form } = this.state;
    const body = { ...form, biz: false };

    try {
      const user = await createUser(body);

      toast.info("User Created Legit", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      this.props.history.replace("/signin");
      console.log("created user", user);
    } catch ({ response }) {
      if (response && response.status === 400) {
        console.log(response);
        this.setState({ errors: { email: response.data } });
      }
    }
  }

  render() {
    if (userService.getCurrentUser()) {
      return <Redirect to="/" />;
    }
    /* redirect user to home page if logged in successfully */

    return (
      <>
        <PageHeader title="Sign up for Real App" />
        <div className="row">
          <div className="col-12">
            <h4>
              <i className="bi bi-person-circle text-success"></i> Create a new
              account please..
            </h4>
          </div>
        </div>
        <form onSubmit={this.handleSubmit} autoComplete="off" noValidate>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          <div className="mt-2">
            {this.renderButtonSubmit("Sign Up")}
            {this.renderButtonReset("Reset")}
          </div>
        </form>
      </>
    );
  }
}

export default Signup;
