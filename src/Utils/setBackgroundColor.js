export const setBackgroundColor = (forecast) => {
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
      if (tempValue >= 35) {
        forecastDivColor = {
          ...forecastDivColor,
          [key]: 'forecastContainer__hot',
        };
      }
      if (tempValue <= 12) {
        forecastDivColor = {
          ...forecastDivColor,
          [key]: 'forecastContainer__cold',
        };
      } else {
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
