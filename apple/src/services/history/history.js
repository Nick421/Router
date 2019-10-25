import * as AuthAxios from "../authaxios/authaxios";

const BASE_URL = "/private_history"

export async function getAllHistory() {
    return (await AuthAxios.authaxiosInstance.get(BASE_URL)).data;
}

export async function saveHistory(routeData) {
    return (await AuthAxios.authaxiosInstance.post(BASE_URL, routeData)).data.historyID;
}

export async function deleteHistory(routeData) {
    return (await AuthAxios.authaxiosInstance.delete(BASE_URL, routeData)).data.historyID;
}