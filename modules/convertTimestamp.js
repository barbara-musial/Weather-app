export function convertTimestampToDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const weekDay = date.toLocaleDateString("en-US", { weekday: "long" });
  const day = date.toLocaleDateString("en-US", { day: "numeric" });
  const month = date.toLocaleDateString("en-US", { month: "long" });

  return `${weekDay}, ${day} ${month} `;
}

export function convertTimestampToTime(timestamp) {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours}:${minutes <= 9 ? "0" + minutes : minutes}`;
}
