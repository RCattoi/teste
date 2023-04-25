const filterForecastData = (forecast) => {
  function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  function parseWeatherIcons(icon) {
    console.log(icon);
    const weatherIcons = {
      '01d': 'B',
      '01n': 'B',
      '02d': 'H',
      '02n': 'H',
      '03d': 'N',
      '03n': 'N',
      '04d': 'Y',
      '04n': 'Y',
      '09d': 'S',
      '09n': 'S',
      '10d': 'R',
      '10n': 'R',
      '11d': 'O',
      '11n': 'O',
      '13d': 'W',
      '13n': 'W',
    };

    for (const key in weatherIcons) {
      if (key === icon) {
        const correctIcon = weatherIcons[key];
        return correctIcon;
      }
    }
  }
  if (forecast) {
    const formattedForecast = {
      today: {
        // icon: forecast[0].weather[0].icon,
        icon: parseWeatherIcons(forecast[0].weather[0].icon),
        temp: forecast[0].main.temp,
        description: capitalizeFirstLetter(forecast[0].weather[0].description),
        wind: forecast[0].wind.speed,
        pressure: forecast[0].main.pressure,
        humidity: forecast[0].main.humidity,
      },
      tomorrow: {
        icon: parseWeatherIcons(forecast[1].weather[0].icon),
        temp: forecast[1].main.temp,
        description: capitalizeFirstLetter(forecast[1].weather[0].description),
      },
      dayAfterTomorrow: {
        icon: parseWeatherIcons(forecast[2].weather[0].icon),
        temp: forecast[2].main.temp,
        description: capitalizeFirstLetter(forecast[2].weather[0].description),
      },
    };
    console.log(formattedForecast);
    return formattedForecast;
  }
};

export default filterForecastData;
