import PageHeader from "./common/pageHeader";
import React from "react";
import Joi from "joi";
import cardService from "../services/cardService";
import { toast } from "react-toastify";
import Form from "./common/form";

class CreateCard extends Form {
  state = {
    form: {
      bizName: "",
      bizDescription: "",
      bizAddress: "",
      bizPhone: "",
      bizImage: "",
    },
    errors: {},
  };

  schema = {
    bizName: Joi.string().min(2).max(255).required().label("name"),
    bizDescription: Joi.string()
      .min(2)
      .max(1024)
      .required()
      .label("description"),
    bizAddress: Joi.string().min(2).max(400).required().label("address"),
    bizPhone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/)
      .label("phone"),
    bizImage: Joi.string().min(11).max(1024).uri().allow("").label("image"),
  };

  async whenSubmit() {
    const {
      form: { bizImage, ...body },
    } = this.state;

    if (bizImage) {
      body.bizImage = bizImage;
    }

    try {
      await cardService.createCard(body);
      toast.success("business created");
      this.props.history.push("/my-cards");
    } catch ({ response }) {
      if (response && response.status === 400) {
        console.log(response.data, "asdssdasda");
        this.setState({ errors: { bizImage: response.data } });
      }
    }
  }

  render() {
    return (
      <>
        <PageHeader title="Create your own Check Legit Business" />
        <div className="row">
          <div className="col-12">
            <h4>
              <i className="bi bi-card-checklist text-success"></i> Create your
              own card please.
            </h4>
          </div>
        </div>
        <form onSubmit={this.handleSubmit} autoComplete="off" noValidate>
          {this.renderInput("bizName", "Name", "text", true)}
          {this.renderInput("bizDescription", "Description", "text", true)}
          {this.renderInput("bizAddress", "Address", "text", true)}
          {this.renderInput("bizPhone", "Phone Number", "tel", true)}
          {this.renderInput("bizImage", "Business Image", "text", false)}

          <div className="mt-2">
            {this.renderButtonSubmit("Create Card")}
            {this.renderButtonReset("Reset")}
          </div>
        </form>
      </>
    );
  }
}

export default CreateCard;
