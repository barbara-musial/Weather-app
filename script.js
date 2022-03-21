"use strict";

const getData = function (coords) {
  const [lat, lon] = coords;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2036b1729952c5742fea723833b9919b`
  )
    .then((response) => response.json())
    .then((data) => console.log(data));
};
getData([52.409538, 16.931992]);
