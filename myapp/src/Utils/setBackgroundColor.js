export const setBackgroundColor = (forecast, isCelsius) => {
  let forecastDivColor = {};
  if (!forecast) {
    forecastDivColor = {
      today: 'forecastContainer__noGeoLocation',
      tomorrow: 'forecastContainer__noGeoLocation',
      dayAfterTomorrow: 'forecastContainer__noGeoLocation',
    };
  } else {
    for (const key in forecast) {
      const tempValue = forecast[key].temp;

      const tempValueNumber = parseInt(tempValue);

      const tempValuehot =
        (isCelsius && tempValueNumber >= 35) ||
        (!isCelsius && tempValueNumber >= 95);

      const tempValueCold =
        (isCelsius && tempValueNumber <= 12) ||
        (!isCelsius && tempValueNumber <= 54);

      const tempValueDefault =
        (isCelsius && tempValueNumber < 35 && tempValueNumber > 12) ||
        (!isCelsius && tempValueNumber < 95 && tempValueNumber > 54);

      if (tempValuehot) {
        forecastDivColor = {
          ...forecastDivColor,
          [key]: 'forecastContainer__hot',
        };
      }
      if (tempValueCold) {
        forecastDivColor = {
          ...forecastDivColor,
          [key]: 'forecastContainer__cold',
        };
      }
      if (tempValueDefault) {
        forecastDivColor = {
          ...forecastDivColor,
          [key]: 'forecastContainer__default',
        };
      }
    }
  }

  return forecastDivColor;
};
export default setBackgroundColor;
