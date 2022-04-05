export function returnWindDirection(windDegrees) {
  let windDirect;

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

  return windDirect;
}
