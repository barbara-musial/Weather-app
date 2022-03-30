export async function getDataFromAPI(endpointURL) {
  const data = await fetch(endpointURL)
    .then((response) => response.json())
    .then((data) => data);

  return data;
}
