import axiosService, { setHeader } from "./axiosService";
import { fullUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const keyToken = "myToken";

setHeader("x-auth-token", getJWT());

export function getJWT() {
  return localStorage.getItem(keyToken);
}

export function createUser(user) {
  return axiosService.post(`${fullUrl}/api/users`, user);
}

export async function login(email, password) {
  const {
    data: { token },
  } = await axiosService.post(`${fullUrl}/api/auth`, { email, password });
  localStorage.setItem(keyToken, token);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(keyToken);
    return jwtDecode(jwt); // full token response
  } catch (error) {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(keyToken);
}

export const userService = {
  createUser,
  login,
  logout,
  getJWT,
  getCurrentUser,
};

export default userService;
