import axios from "axios";

export const authaxiosInstance = axios.create({
  baseURL: "/api",
});

export function setBearerToken(accessToken) {
  authaxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}