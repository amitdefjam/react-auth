import React from "react";
import Form from "./common/form";
import Joi from "joi";
import cardService from "../services/cardService";
import { toast } from "react-toastify";
import PageHeader from "./common/pageHeader";
import { Link } from "react-router-dom";

class EditCard extends Form {
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
    _id: Joi.string(),
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

  async componentDidMount() {
    const id = this.props.match.params.id;
    const {
      data: { _id, bizDescription, bizAddress, bizName, bizPhone, bizImage },
    } = await cardService.getCard(id);

    this.setState({
      form: {
        _id,
        bizName,
        bizDescription,
        bizAddress,
        bizPhone,
        bizImage,
      },
    });
  }

  async whenSubmit() {
    const { form: card } = this.state;
    await cardService.editCard(card);
    toast.success("card has been updated");
    this.props.history.replace("/my-cards");
  }

  render() {
    return (
      <>
        <PageHeader title="Edit Card" />
        <div className="row">
          <div className="col-12">
            <h4>
              <i className="bi bi-card-checklist text-success"></i> Edit your
              card please...
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
            {this.renderButtonSubmit("Save")}
            {this.renderButtonReset("Reset")}
            <Link to=".." className="ms-2 btn btn-danger">
              Cancel
            </Link>
          </div>
        </form>
      </>
    );
  }
}

export default EditCard;
