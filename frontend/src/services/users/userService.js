import axios from "axios";
import { base_url } from "../../utils/url";
import { getUserFromStorage } from "../../utils/getUserFromStorage";
//! Get the token
const token = getUserFromStorage();
//! Login
export const loginAPI = async ({ email, password }) => {
  const response = await axios.post(`${base_url}/users/login`, {
    email,
    password,
  });
  //Return a promise
  return response.data;
}
export const registerAPI = async ({ username,email, password }) => {
  const response = await axios.post(`${base_url}/users/register`, {
    username,
    email,
    password,
  });
  //Return a promise
  return response.data;
}