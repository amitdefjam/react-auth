import axiosService from "./axiosService";
import { fullUrl } from "../config.json";

export function createCard(card) {
  return axiosService.post(`${fullUrl}/api/cards`, card);
}

export function getMyCards() {
  return axiosService.get(`${fullUrl}/api/cards/my-cards`);
}

export function deleteCard(id) {
  return axiosService.delete(`${fullUrl}/api/cards/${id}`);
}

export const cardService = {
  createCard,
  getMyCards,
  deleteCard,
};

export default cardService;
