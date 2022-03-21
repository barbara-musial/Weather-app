"use strict";

const weatherIconBox = document.querySelector(".weather--icon--box");
const weatherDescriptionBox = document.querySelector(
  ".weather--description--box"
);
const currTempBox = document.querySelector(".curr--temp--box");
const feelsLikeCurrTempBox = document.querySelector(
  ".feels--like--curr--temp--box"
);
const minTodaysTempBox = document.querySelector(".min--todays--temp--box");

const getData = function (coords) {
  const [lat, lon] = coords;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2036b1729952c5742fea723833b9919b&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      const weatherIcon = data.weather[0].icon;
      const weatherDescription = data.weather[0].description;
      const currTemp = `${Number(data.main.temp).toFixed(0)}℃`;
      const feelsLikeCurrTemp = `${Number(data.main.feels_like).toFixed(0)}℃`;
      const minTodaysTemp = `${Number(data.main.temp_min).toFixed(0)}℃`;

      displayWeatherIcon(weatherIcon);
      setData(weatherDescription, weatherDescriptionBox);
      setData(currTemp, currTempBox);
      setData(feelsLikeCurrTemp, feelsLikeCurrTempBox);
      setData(minTodaysTemp, minTodaysTempBox);
    });
};
getData([52.409538, 16.931992]);

function displayWeatherIcon(icon) {
  const weatherIcon = document.createElement("img");

  weatherIcon.src = `./images/${icon}.png`;
  weatherIcon.className = "weather--icon";

  weatherIconBox.appendChild(weatherIcon);
}

function setData(data, box) {
  box.textContent = data;
}
