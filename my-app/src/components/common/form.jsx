import React, { Component } from "react";
import Joi from "joi";
import Input from "./input";

class Form extends Component {
  //! --->
  validateInput = ({ name, value }) => {
    //acquire the data
    const data = {
      [name]: value,
    };

    const schema = Joi.object({
      [name]: this.schema[name],
    });

    //validate by the data
    const { error } = schema.validate(data);

    return error ? error.details[0].message : null;
  };

  validateForm() {
    //acquire the data
    const {
      schema,
      state: { form },
    } = this;

    //validate by the data
    const { error } = Joi.object(schema).validate(form, {
      abortEarly: false,
    });
    //return null if no error exist
    if (!error) {
      return null;
    }

    //reArrange validation data
    const errors = {};
    for (const detail of error.details) {
      errors[detail.path[0]] = detail.message;
    }

    //return arranged details
    return errors;
    //! <----
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validateForm();
    this.setState({ errors });

    if (errors) {
      return;
    }

    this.whenSubmit();

    if (!this.whenSubmit) {
      throw new Error("Access Denied!");
    }
  };

  //update state on every change + equal target to input value + show errors after validation
  handleChange = ({ target }) => {
    const { form, errors } = this.state;

    this.setState({
      form: {
        ...form,
        [target.name]: target.value,
      },
      errors: {
        ...errors,
        [target.name]: this.validateInput(target),
      },
    });
  };

  resetForm = () => {
    const { form } = this.state;
    const updatedForm = {};
    for (const key in form) {
      updatedForm[key] = "";
    }
    this.setState({
      form: updatedForm,
    });
  };

  renderInput(name, label, type = "text", required = false) {
    const { form, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        label={label}
        onChange={this.handleChange}
        value={form[name]}
        error={errors && errors[name]}
        required={required}
      />
    );
  }
  renderButtonSubmit(label) {
    return (
      <>
        <button className="btn btn-primary float-start">{label}</button>
      </>
    );
  }
  renderButtonReset(label) {
    return (
      <>
        <button
          type="button"
          onClick={this.resetForm}
          className="btn btn-primary float-end"
        >
          {label}
        </button>
      </>
    );
  }
}

export default Form;
