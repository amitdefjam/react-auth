import axiosService from "./axiosService";
import { fullUrl } from "../config.json";

export function createCard(card) {
  return axiosService.post(`${fullUrl}/api/cards`, card);
}

export const cardService = {
  createCard,
};

export default cardService;
