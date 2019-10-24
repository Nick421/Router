import * as AuthAxios from "../authaxios/authaxios";

const BASE_URL = "/private_favourite"

export async function getAllFavourites() {
    return (await AuthAxios.authaxiosInstance.get(BASE_URL)).data;
}

export async function saveFavourite(routeData) {
    return (await AuthAxios.authaxiosInstance.post(BASE_URL, routeData)).data.favouriteID;
}