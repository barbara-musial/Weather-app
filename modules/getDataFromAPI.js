export const getDataFromAPI = async function (endpointURL) {
  const response = await fetch(endpointURL);
  const data = await response.json();
  return data;
};
