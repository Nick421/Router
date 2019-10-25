import * as AuthAxios from "../authaxios/authaxios";

const BASE_URL = "/private_favourite"

export async function deleteFavourite(routeData) {
    return (await AuthAxios.authaxiosInstance.delete(BASE_URL, routeData)).data.message;
}

export async function saveFavourite(routeData) {
    return (await AuthAxios.authaxiosInstance.post(BASE_URL, routeData)).data.message;
}