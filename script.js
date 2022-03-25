"use strict";

// Containers
const timeBackgroundImg = document.querySelector(".time-img");
const currTempCont = document.querySelector(".curr-temp");
const feelsLikeCont = document.querySelector(".feels-like-curr-temp");
const weatherIconCont = document.querySelector(".weather-icon");
const weatherDescCont = document.querySelector(".weather-desc");
const locationCont = document.querySelector(".location");
const currDayCont = document.querySelector(".curr-day");
const currTimeCont = document.querySelector(".curr-time");
const sunriseTimeCont = document.querySelector(".sunrise-time");
const sunsetTimeCont = document.querySelector(".sunset-time");
const minTempCont = document.querySelector(".min-temp");
const maxTempCont = document.querySelector(".max-temp");
const windSpeedCont = document.querySelector(".wind-speed");
const windDirectCont = document.querySelector(".wind-direction");
const humidityCont = document.querySelector(".humidity");
const pressureCont = document.querySelector(".pressure");

const getAndShowData = function (coords) {
  const [lat, lon] = coords;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2036b1729952c5742fea723833b9919b&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      const currTemp = `${Number(data.main.temp).toFixed(0)}°C`;
      const feelsLikeCurrTemp = `${Number(data.main.feels_like).toFixed(0)}°C`;
      const weatherIcon = data.weather[0].icon;
      const weatherDescription = data.weather[0].description;

      const location = data.name;
      // const sunrise
      // const sunset
      const minTemp = `${Number(data.main.temp_min).toFixed(0)}°C`;
      const maxTemp = `${Number(data.main.temp_max).toFixed(0)}°C`;
      const windSpeed = `${(Number(data.wind.speed) * 3.6).toFixed(2)} km/h`;
      // const windDirection
      const humidity = `${data.main.humidity}%`;
      const pressure = `${data.main.pressure} hPa`;

      // Set background time img
      displayImg(
        weatherIcon.charAt(weatherIcon.length - 1) === "n" ? "night" : "day",
        timeBackgroundImg,
        "jpg"
      );

      // Set weather Icon
      weatherIconCont.classList.add(
        `icon-${
          weatherIcon.charAt(weatherIcon.length - 1) === "n" ? "night" : "day"
        }`
      );
      displayImg(weatherIcon, weatherIconCont, "png");

      // Set rest of data
      displayData(currTemp, currTempCont);
      displayData(feelsLikeCurrTemp, feelsLikeCont);
      displayData(weatherDescription, weatherDescCont);
      displayData(location, locationCont);
      displayData(minTemp, minTempCont);
      displayData(maxTemp, maxTempCont);
      displayData(windSpeed, windSpeedCont);
      displayData(humidity, humidityCont);
      displayData(pressure, pressureCont);

      console.log(data);
    });
};
getAndShowData([38.898444, -77.048535]);

function displayData(data, container) {
  container.textContent = data;
}

function displayImg(img, container, format) {
  container.src = `./images/${img}.${format}`;
}
