import axios from "axios";

export const authaxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
});

export function setBearerToken(accessToken) {
  authaxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}

export function checkHeader() {
  return authaxiosInstance.defaults.headers.common;
}