export async function getDataFromAPI(endpointURL) {
  const data = await fetch(endpointURL)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error(`Something went wrong! ${error}`);
      return "Something went wrong... Try again!";
    });

  return data;
}
