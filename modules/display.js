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
