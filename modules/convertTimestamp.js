export function convertTimestampToDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const weekDay = convertTimestampToWeekDay(timestamp);
  const day = date.toLocaleDateString("en-US", { day: "numeric" });
  const month = date.toLocaleDateString("en-US", { month: "long" });

  return `${weekDay}, ${day} ${month} `;
}

export function convertTimestampToWeekDay(timestamp) {
  const weekDay = new Date(timestamp * 1000).toLocaleDateString("en-US", {
    weekday: "long",
  });

  return weekDay;
}

export function convertTimestampToTime(timestamp) {
  const date = new Date(timestamp * 1000);
  const hour = date.getHours();
  const minutes = date.getMinutes();

  return `${hour}:${minutes <= 9 ? "0" + minutes : minutes}`;
}
