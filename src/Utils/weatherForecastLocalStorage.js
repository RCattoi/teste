import getFormattedCurrentDate from './formattedFullCurrentDate.js';

export const getForecastLocalStorage = (formattedCity) => {
  const formattedDate = getFormattedCurrentDate();

  const getLocalStorageDate = localStorage.getItem(
    `${formattedDate}-${formattedCity}`
  );
  return getLocalStorageDate;
};

export const saveForeCastLocalStorage = (formattedCity, forecast) => {
  const formattedDate = getFormattedCurrentDate();
  const forecastFormatted = JSON.stringify(forecast);
  localStorage.setItem(`${formattedDate}-${formattedCity}`, forecastFormatted);
};

export const deleteForeCastLocalStorage = (formattedCity, forecast) => {
  const localStorageKeys = getLocalStorageKeysForecast();
  localStorageKeys.forEach((element) => {
    localStorage.removeItem(element);
  });
};

const getLocalStorageKeysForecast = () => {
  let keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const foreCastKey = parseInt(key);
    if (!!foreCastKey && foreCastKey !== parseInt(getFormattedCurrentDate())) {
      keys.push(localStorage.key(i));
    }
  }
  return keys;
};
