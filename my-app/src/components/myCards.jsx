import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import cardService from "../services/cardService";
import Card from "./card";
import PageHeader from "./common/pageHeader";

class MyCards extends Component {
  state = {
    cards: [],
  };

  //step 1 : get card when component mounts and insert into the state and update state.
  async componentDidMount() {
    this.getMyCards();
  }

  async getMyCards(id) {
    const { data } = await cardService.getMyCards(id);
    if (data.length) {
      this.setState({
        cards: data,
      });
    }
  }

  // step 2 :
  handleCardDelete = async (id) => {
    await cardService.deleteCard(id);
    toast.warning("Card Deleted");

    const { cards } = this.state;

    this.setState({
      cards: cards.filter((card) => card._id !== id),
    });
  };

  render() {
    const { cards } = this.state;
    return (
      <>
        <PageHeader title="My Cards" />
        <div className="row">
          <div className="col-12">
            <p>Your cards are listed below...</p>
          </div>
        </div>
        <div className="row">
          {cards.length ? (
            cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onDelete={() => this.handleCardDelete(card._id)}
              />
            ))
          ) : (
            <h5>No cards exist at all...</h5>
          )}
        </div>
        <div className="row">
          <div className="col-12">
            <button type="button" className="btn btn-outline-success mt-2">
              <Link to="/create-card">
                <i class="bi bi-patch-plus-fill"></i> Create New Card
              </Link>
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default MyCards;
