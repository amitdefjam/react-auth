import axiosService from "./axiosService";
import { fullUrl } from "../config.json";

export function createCard(card) {
  return axiosService.post(`${fullUrl}/api/cards`, card); //activates line 51 at rest-api backend routes/cards.js
}

export function getMyCards() {
  return axiosService.get(`${fullUrl}/api/cards/my-cards`); //activates line 7 at rest-api backend routes/cards.js
}

export function deleteCard(id) {
  return axiosService.delete(`${fullUrl}/api/cards/${id}`); // activates line 16 at rest-api backend routes/cards.js
}

export function getCard(id) {
  return axiosService.get(`${fullUrl}/api/cards/${id}`); // activates line 41 at rest-api backend routes/cards.js
}

export function editCard({ _id, ...body }) {
  return axiosService.put(`${fullUrl}/api/cards/${_id}`, body); // activates line 26 at rest-api backend routes/cards.js
}

export const cardService = {
  createCard,
  getMyCards,
  deleteCard,
  getCard,
  editCard,
};

export default cardService;
