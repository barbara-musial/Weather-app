export async function getDataFromAPI(endpointURL) {
  const data = await fetch(endpointURL)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error(`Something went wrong! ${error}`);
      alert(`Something went wrong... ${error}. Try again!`);
    });

  return data;
}
