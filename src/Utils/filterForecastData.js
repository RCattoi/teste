const filterForecastData = (forecast) => {
  function mpsToKph(mps) {
    let kph = Math.round(mps * 3.6);
    return `${kph}km/h`;
  }

  function degToDirection(degrees) {
    const directions = [
      'N',
      'NNE',
      'NE',
      'ENE',
      'L',
      'ESE',
      'SE',
      'SSE',
      'S',
      'SSO',
      'SO',
      'OSO',
      'O',
      'ONO',
      'NO',
      'NNO',
    ];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  }
  function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  function parseWeatherIcons(icon) {
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
        icon: parseWeatherIcons(forecast[0].weather[0].icon),
        temp: `${Math.round(forecast[0].main.temp)} °C`,
        description: capitalizeFirstLetter(forecast[0].weather[0].description),
        wind: `${degToDirection(forecast[0].wind.deg)} ${mpsToKph(
          forecast[0].wind.speed
        )}`,
        pressure: `${forecast[0].main.pressure} hPA`,
        humidity: `${forecast[0].main.humidity}%`,
      },
      tomorrow: {
        icon: parseWeatherIcons(forecast[1].weather[0].icon),
        temp: `${Math.round(forecast[1].main.temp)} °C`,
        description: capitalizeFirstLetter(forecast[1].weather[0].description),
      },
      dayAfterTomorrow: {
        icon: parseWeatherIcons(forecast[2].weather[0].icon),
        temp: `${Math.round(forecast[2].main.temp)} °C`,
        description: capitalizeFirstLetter(forecast[2].weather[0].description),
      },
    };
    return formattedForecast;
  }
};

export default filterForecastData;
