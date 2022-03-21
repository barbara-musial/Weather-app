"use strict";

const currWeatcherBoxBorder = document.querySelector(
  ".curr--weather--box--border"
);
const currWeatherBox = document.querySelector(".curr--weather--box");

const getData = function (coords) {
  const [lat, lon] = coords;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2036b1729952c5742fea723833b9919b&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      const location = data.name;
      const weatherIcon = data.weather[0].icon;
      const weatherDescription = data.weather[0].description;
      const currTemp = `${Number(data.main.temp).toFixed(0)}℃`;
      const feelsLikeCurrTemp = `${Number(data.main.feels_like).toFixed(0)}℃`;
      const minTodaysTemp = `${Number(data.main.temp_min).toFixed(0)}℃`;
      const maxTodaysTemp = `${Number(data.main.temp_max).toFixed(0)}℃`;
      const todaysPressure = `${data.main.pressure} hPa`;
      const todaysHumidity = `${data.main.humidity}%`;
      const todaysWind = `${(Number(data.wind.speed) * 3.6).toFixed(2)} km/h`;

      const html = `
      <h1 class="location">${location}</h1>
      <img src="./images/${weatherIcon}.png" class="weather--icon">
      <h3 class="weather--description">${weatherDescription}</h3>
      <h2>${currTemp}</h2>
      <h3>${feelsLikeCurrTemp}</h3>
      <div class="weather--details--box">
        <h4>${minTodaysTemp}</h4>
        <h4>${maxTodaysTemp}</h4>
        <h4>${todaysPressure}</h4>
        <h4>${todaysHumidity}</h4>
        <h4>${todaysWind}</h4>
      </div>
     `;

      currWeatherBox.innerHTML = html;
    });
};
getData([38.898444, -77.048535]);
