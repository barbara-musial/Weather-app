"use strict";

const weatherIconBox = document.querySelector(".weather--icon--box");
const weatherDescriptionBox = document.querySelector(
  ".weather--description--box"
);

const getData = function (coords) {
  const [lat, lon] = coords;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2036b1729952c5742fea723833b9919b`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      const weatherIcon = data.weather[0].icon;
      const weatherDescription = data.weather[0].description;

      displayWeatherIcon(weatherIcon);
      setWeatherDescription(weatherDescription);
    });
};
getData([52.409538, 16.931992]);

function displayWeatherIcon(icon) {
  const weatherIcon = document.createElement("img");

  weatherIcon.src = `./images/${icon}.png`;
  weatherIcon.className = "weather--icon";

  weatherIconBox.appendChild(weatherIcon);
}

function setWeatherDescription(description) {
  weatherDescriptionBox.textContent = description;
}
