import * as AuthAxios from "../authaxios/authaxios";

const BASE_URL = "/private_history"

export async function getAllHistory() {
    return await AuthAxios.authaxiosInstance.get(BASE_URL);
}