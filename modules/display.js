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

export function displayCurrDateAndTime(dateContainer, timeContainer) {
  const currDateTimestamp = Math.floor(new Date(new Date()).getTime() / 1000);
  dateContainer.textContent = convertTimestampToDate(currDateTimestamp);
  timeContainer.textContent = convertTimestampToTime(currDateTimestamp);
}
