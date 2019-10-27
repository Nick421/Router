import axios from "axios";

export const authaxiosInstance = axios.create({
  baseURL: "http://3.24.181.251:8000/api",
});

export function setBearerToken(accessToken) {
  authaxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}

export function checkHeader() {
  return authaxiosInstance.defaults.headers.common;
}