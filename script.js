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
      const timezone = data.timezone;
      const sunriseTime = convertTimestampToTime(data.sys.sunrise + timezone);
      const sunsetTime = convertTimestampToTime(data.sys.sunset + timezone);
      const minTemp = `${Number(data.main.temp_min).toFixed(0)}°C`;
      const maxTemp = `${Number(data.main.temp_max).toFixed(0)}°C`;
      const windSpeed = `${(Number(data.wind.speed) * 3.6).toFixed(2)} km/h`;
      const windDegrees = data.wind.deg;
      let windDirect;
      const humidity = `${data.main.humidity}%`;
      const pressure = `${data.main.pressure} hPa`;

      // Set wind direction
      if (windDegrees >= 349 || windDegrees <= 11) {
        windDirect = "N";
      } else if (windDegrees >= 12 && windDegrees <= 33) {
        windDirect = "NNE";
      } else if (windDegrees >= 34 && windDegrees <= 56) {
        windDirect = "NE";
      } else if (windDegrees >= 57 && windDegrees <= 78) {
        windDirect = "ENE";
      } else if (windDegrees >= 79 && windDegrees <= 101) {
        windDirect = "E";
      } else if (windDegrees >= 102 && windDegrees <= 123) {
        windDirect = "ESE";
      } else if (windDegrees >= 124 && windDegrees <= 146) {
        windDirect = "SE";
      } else if (windDegrees >= 147 && windDegrees <= 168) {
        windDirect = "SSE";
      } else if (windDegrees >= 169 && windDegrees <= 191) {
        windDirect = "S";
      } else if (windDegrees >= 192 && windDegrees <= 213) {
        windDirect = "SSW";
      } else if (windDegrees >= 214 && windDegrees <= 236) {
        windDirect = "SW";
      } else if (windDegrees >= 237 && windDegrees <= 258) {
        windDirect = "WSW";
      } else if (windDegrees >= 259 && windDegrees <= 281) {
        windDirect = "W";
      } else if (windDegrees >= 282 && windDegrees <= 303) {
        windDirect = "WNW";
      } else if (windDegrees >= 304 && windDegrees <= 326) {
        windDirect = "NW";
      } else if (windDegrees >= 327 && windDegrees <= 348) {
        windDirect = "NNW";
      }

      // Display background time img
      displayImg(
        weatherIcon.charAt(weatherIcon.length - 1) === "n" ? "night" : "day",
        timeBackgroundImg,
        "jpg"
      );

      // Display weather Icon
      weatherIconCont.classList.add(
        `icon-${
          weatherIcon.charAt(weatherIcon.length - 1) === "n" ? "night" : "day"
        }`
      );
      displayImg(weatherIcon, weatherIconCont, "png");

      // Display rest of data
      displayData(currTemp, currTempCont);
      displayData(feelsLikeCurrTemp, feelsLikeCont);
      displayData(weatherDescription, weatherDescCont);
      displayData(location, locationCont);
      displayData(sunriseTime, sunriseTimeCont);
      displayData(sunsetTime, sunsetTimeCont);
      displayData(minTemp, minTempCont);
      displayData(maxTemp, maxTempCont);
      displayData(windSpeed, windSpeedCont);
      displayData(windDirect, windDirectCont);
      displayData(humidity, humidityCont);
      displayData(pressure, pressureCont);

      displayCurrDateAndTime();

      console.log(data);
      console.log(Math.floor(new Date(new Date()).getTime() / 1000));
    });
};
getAndShowData([52.409538, 16.931992]);

function displayData(data, container) {
  container.textContent = data;
}

function displayImg(img, container, format) {
  container.src = `./images/${img}.${format}`;
}

function convertTimestampToTime(timestamp) {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours}:${minutes <= 9 ? "0" + minutes : minutes}`;
}
function convertTimestampToDate(timestamp) {
  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const date = new Date(timestamp * 1000);
  const weekDay = date.toLocaleDateString("en-US", { weekday: "long" });
  const day = date.toLocaleDateString("en-US", { day: "numeric" });
  const month = date.toLocaleDateString("en-US", { month: "long" });
  return `${weekDay}, ${day} ${month} `;
}

function displayCurrDateAndTime() {
  const currDateTimestamp = Math.floor(new Date(new Date()).getTime() / 1000);
  currDayCont.textContent = convertTimestampToDate(currDateTimestamp);
  currTimeCont.textContent = convertTimestampToTime(currDateTimestamp);
}
