import axios from "axios";

export const authaxiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
});

export function setBearerToken(accessToken) {
  authaxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}

export function checkHeader() {
  return authaxiosInstance.defaults.headers.common;
}