import {
  convertTimestampToDate,
  convertTimestampToTime,
} from "./convertTimestamp.js";

export function displayData(data, container) {
  container.textContent = data;
}

export function displayImg(img, container, format) {
  container.src = `./images/${img}.${format}`;
}

export function displayCurrDateAndTime(
  timestamp,
  dateContainer,
  timeContainer
) {
  dateContainer.textContent = convertTimestampToDate(timestamp);
  timeContainer.textContent = convertTimestampToTime(timestamp);
}

export function dailyHourlyForecastDisplay(
  showCont,
  boldButton,
  hideCont,
  lightButton
) {
  showCont.classList.remove("hidden");
  hideCont.classList.add("hidden");

  boldButton.style.fontWeight = "700";
  lightButton.style.fontWeight = "500";
}
