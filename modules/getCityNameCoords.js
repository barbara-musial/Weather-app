import { getDataFromAPI } from "./getDataFromAPI.js";

export async function getCityNameCoords(cityName) {
  const data = await getDataFromAPI(
    `https://api.geoapify.com/v1/geocode/search?text=${cityName}&lang=en&limit=10&type=city&apiKey=f52a5f9fe97247faaeb2a726f9ca5405`
  );

  if (data.features.length === 0) {
    console.error("Unknown city, try again!");

    return "error";
  } else {
    const coords = [
      data.features[0].properties.lat,
      data.features[0].properties.lon,
    ];

    return coords;
  }
}
