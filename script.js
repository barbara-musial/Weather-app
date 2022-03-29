import {
  convertTimestampToTime,
  convertTimestampToWeekDay,
} from "./modules/convertTimestamp.js";
import {
  displayImg,
  displayData,
  displayCurrDateAndTime,
} from "./modules/display.js";
import { getDataFromAPI as getData } from "./modules/getDataFromAPI.js";

// Containers
const widgetCont = document.querySelector(".container");
const backgroundImgCont = document.querySelector(".img-container");
const timeBackgroundImg = document.querySelector(".time-img");
const currTempCont = document.querySelector(".curr-temp");
const feelsLikeCont = document.querySelector(".feels-like-curr-temp");
const weatherIconCont = document.querySelector(".weather-icon");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDescCont = document.querySelector(".weather-desc");
const infoCont = document.querySelector(".info-container");
const locationCont = document.querySelector(".location");
const currDayCont = document.querySelector(".curr-day");
const currTimeCont = document.querySelector(".curr-time");
const detailsCont = document.querySelector(".details-container");
const tileIcons = document.querySelectorAll(".tile-icon");
const sunriseTimeCont = document.querySelector(".sunrise-time");
const sunsetTimeCont = document.querySelector(".sunset-time");
const minTempCont = document.querySelector(".min-temp");
const maxTempCont = document.querySelector(".max-temp");
const windSpeedCont = document.querySelector(".wind-speed");
const windDirectCont = document.querySelector(".wind-direction");
const windDirectIcon = document.querySelector(".wind-direct-icon");
const humidityCont = document.querySelector(".humidity");
const pressureCont = document.querySelector(".pressure");
const forecastCont = document.querySelector(".weather-forecast");
const forecastTiles = document.querySelectorAll(".forecast-tile");
const hourlyForecastCont = document.querySelector(".hourly-forecast");
const dailyForecastCont = document.querySelector(".daily-forecast");

async function displayWeatherData(coords) {
  const [lat, lon] = coords;

  const location = (
    await getData(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=f52a5f9fe97247faaeb2a726f9ca5405`
    )
  ).features[0].properties.city;

  const weatherData = await getData(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=2036b1729952c5742fea723833b9919b`
  );

  const currTemp = `${weatherData.current.temp.toFixed(0)}°C`;
  const feelsLikeCurrTemp = `${weatherData.current.feels_like.toFixed(0)}°C`;
  const currWeatherIcon = weatherData.current.weather[0].icon;
  const currWeatherDescription = weatherData.current.weather[0].description;
  const timezoneOffset = weatherData.timezone_offset;
  const sunriseTime = convertTimestampToTime(
    weatherData.current.sunrise + timezoneOffset
  );
  const sunsetTime = convertTimestampToTime(
    weatherData.current.sunset + timezoneOffset
  );
  const minTemp = `${weatherData.daily[0].temp.min.toFixed(1)}°C`;
  const maxTemp = `${weatherData.daily[0].temp.max.toFixed(1)}°C`;
  const windSpeed = `${(weatherData.current.wind_speed * 3.6).toFixed(1)}km/h`;
  const windDegrees = weatherData.current.wind_deg;
  let windDirect;
  const humidity = `${weatherData.current.humidity}%`;
  const pressure = `${weatherData.current.pressure} hPa`;

  // Display background time img
  displayImg(
    currWeatherIcon.at(-1) === "n" ? "night" : "day",
    timeBackgroundImg,
    "jpg"
  );

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

  // Display wind direction icon
  displayImg(
    windDirect.length > 2 ? "wind-direct" : windDirect,
    windDirectIcon,
    "png"
  );

  // Display current weather data
  displayImg(currWeatherIcon, weatherIconCont, "png");
  displayData(currTemp, currTempCont);
  displayData(feelsLikeCurrTemp, feelsLikeCont);
  displayData(currWeatherDescription, weatherDescCont);
  displayData(location, locationCont);
  displayData(sunriseTime, sunriseTimeCont);
  displayData(sunsetTime, sunsetTimeCont);
  displayData(minTemp, minTempCont);
  displayData(maxTemp, maxTempCont);
  displayData(windSpeed, windSpeedCont);
  displayData(windDirect, windDirectCont);
  displayData(humidity, humidityCont);
  displayData(pressure, pressureCont);
  displayCurrDateAndTime(weatherData.current.dt, currDayCont, currTimeCont);

  // Display hourly forecast data
  weatherData.hourly.map((hourlyData) => {
    const forecastTime = convertTimestampToTime(hourlyData.dt + timezoneOffset);
    const forecastTemp = hourlyData.temp.toFixed(1);
    const forecastIcon = hourlyData.weather[0].icon;

    const html = `
    <div class="forecast-tile hourly-tile">
      <p class="forecast-time-date row-1 col-1">${forecastTime}</p>
      <img src="./images/${forecastIcon}.png" class="hourly-icon icon-day row-2 col-1" />
      <h3 class="hourly-forecast-temp row-3 col-1">${forecastTemp}°C</h3>
    </div>
    `;

    hourlyForecastCont.innerHTML += html;
  });

  // Display daily forecast data
  weatherData.daily.slice(1).map((dailyData) => {
    const forecastWeekDay = convertTimestampToWeekDay(
      dailyData.dt + timezoneOffset
    );
    const forecastIcon = dailyData.weather[0].icon;
    const tempDay = dailyData.temp.day.toFixed(1);
    const tempNight = dailyData.temp.night.toFixed(1);
    const iconColor =
      currWeatherIcon.at(-1) === "d"
        ? "forecast-icon-color-day"
        : "forecast-icon-color-night";

    const html = `
    <div class="forecast-tile daily-tile">
      <p class="forecast-time-date row-1 col-1">${forecastWeekDay}</p>
      <img src="./images/${forecastIcon}.png" class="daily-icon ${iconColor} " />
      <div class="daily-forecast-temp">
      <img src="./images/01d.png " class="${iconColor} row-1 col-1" />
      <h3 class="row-1 col-2">${tempDay}°C</h3>
        <img src="./images/01n.png" class="${iconColor} row-2 col-1" />
        <h3 class="row-2 col-2">${tempNight}°C</h3>
      </div>
    </div>
    `;

    dailyForecastCont.innerHTML += html;
  });

  // Set colors if night mode
  if (currWeatherIcon.at(-1) === "n") {
    // container
    widgetCont.style.color = "#e6e6ee";
    widgetCont.style.textShadow = "3px -3px 3px #0a1522";
    // img-container
    backgroundImgCont.style.borderRight = "14px double #d5d5d5";
    backgroundImgCont.style.boxShadow =
      "6px 6px 16px #0a1521, -6px -6px 16px #122941";
    // weather-icon
    weatherIcon.style.filter =
      "invert(88%) sepia(5%) saturate(1117%) hue-rotate(202deg) brightness(110%) contrast(86%)";
    // info-container
    infoCont.style.backgroundColor = "#0e1f31";
    infoCont.style.boxShadow = "6px 6px 16px #0a1521, -6px -6px 16px #122941";
    // details-container
    detailsCont.style.boxShadow =
      "6px 6px 16px #0a1521, -6px -6px 16px #122941";
    // tile-icon
    tileIcons.forEach(
      (tileIcon) =>
        (tileIcon.style.filter =
          "invert(90%) sepia(0%) saturate(5%) hue-rotate(166deg) brightness(83%) contrast(97%)")
    );
    // weather-forecast
    forecastCont.style.boxShadow =
      "6px 6px 16px #0a1521, -6px -6px 16px #122941";
  }
}
displayWeatherData([52.229676, 21.012229]);
