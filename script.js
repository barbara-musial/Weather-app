"use strict";

const locationBox = document.querySelector(".location--box");
const weatherIconBox = document.querySelector(".weather--icon--box");
const weatherDescriptionBox = document.querySelector(
  ".weather--description--box"
);
const currTempBox = document.querySelector(".curr--temp--box");
const feelsLikeCurrTempBox = document.querySelector(
  ".feels--like--curr--temp--box"
);
const minTodaysTempBox = document.querySelector(".min--todays--temp--box");
const maxTodaysTempBox = document.querySelector(".max--todays--temp--box");
const todaysPressureBox = document.querySelector(".todays--pressure--box");
const todaysHumidityBox = document.querySelector(".todays--humidity--box");
const todaysWindBox = document.querySelector(".todays--wind--box");

const getData = function (coords) {
  const [lat, lon] = coords;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2036b1729952c5742fea723833b9919b&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

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

      setDataInBox(location, locationBox);
      displayWeatherIcon(weatherIcon);
      setDataInBox(weatherDescription, weatherDescriptionBox);
      setDataInBox(currTemp, currTempBox);
      setDataInBox(feelsLikeCurrTemp, feelsLikeCurrTempBox);
      setDataInBox(minTodaysTemp, minTodaysTempBox);
      setDataInBox(maxTodaysTemp, maxTodaysTempBox);
      setDataInBox(todaysPressure, todaysPressureBox);
      setDataInBox(todaysHumidity, todaysHumidityBox);
      setDataInBox(todaysWind, todaysWindBox);
    });
};
getData([38.898444, -77.048535]);

function displayWeatherIcon(icon) {
  const weatherIcon = document.createElement("img");

  weatherIcon.src = `./images/${icon}.png`;
  weatherIcon.className = "weather--icon";

  weatherIconBox.appendChild(weatherIcon);
}

function setDataInBox(data, box) {
  box.textContent = data;
}
