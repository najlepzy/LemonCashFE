import axios from "@api/axios";
import { SignInPayload, SignUpPayload } from "@interface/services/interfaces";

const authLogin = import.meta.env.VITE_AUTH_LOGIN;
const authRegister = import.meta.env.VITE_AUTH_REGISTER;

export const signIn = async (payload: SignInPayload) => {
  const response = await axios.post(authLogin, payload);
  return response.data;
};

export const signUp = async (payload: SignUpPayload) => {
  const response = await axios.post(authRegister, payload);
  return response.data;
};