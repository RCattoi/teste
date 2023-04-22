import React, { useEffect, useState, useRef } from 'react';
import Content from './Content.js';
import useFetch from './Hooks/useFetch.js';
import style from './style/search.module.css';
import useBrowserLocation from './Hooks/useBrowserLocation.js';

const Search = () => {
  const [location, setLocation] = useState(null);
  const [placeholderCity, setPlaceholderCity] = useState(null);
  const [locationError, setLocationError] = useState(false);
  const [data, setData] = useState(null);

  const { request } = useFetch();

  // useEffect(() => {
  //   const successCallback = (position) => {
  //     setLocation({
  //       latitude: position.coords.latitude,
  //       longitude: position.coords.longitude,
  //     });
  //     setLocationError(false);
  //   };

  //   const errorCallback = (error) => {
  //     setLocationError(true);
  //   };
  //   navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  // }, []);

  navigator.geolocation.getCurrentPosition((position) =>
    console.log(position.coords.latitude)
  );

  useEffect(() => {
    const getWeatherForecast = async () => {
      if (location) {
        const { latitude, longitude } = location;
        const geoLocationResponse = await request(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=4a4408f51dea4075bc35dcf06cf0bcd6`
        );
        const geoLocationCity =
          geoLocationResponse.json.results[0].components.city;
        setPlaceholderCity(geoLocationCity);
        const formattedGeoLocationCity = geoLocationCity
          .replaceAll(' ', '+')
          .toLowerCase();
        const apiKey = '772920597e4ec8f00de8d376dfb3f094';
        const weatherForecastResponse = await request(
          `https://api.openweathermap.org/data/2.5/forecast?q=${formattedGeoLocationCity}&appid=${apiKey}`
        );
        setData(weatherForecastResponse.json);
      }
    };
    getWeatherForecast();
  }, [location]);

  return (
    <>
      {locationError && (
        <div className={style.search__erro}>
          Para melhor Utilizar o serviço, ative a geolocalização!
        </div>
      )}
      <input
        placeholder={placeholderCity}
        onClick={() => setLocationError(false)}
        className={style.search__bar}
      ></input>
      <Content data={data} />
    </>
  );
};

export default Search;
