import React, { useEffect, useState, useRef } from 'react';
import Content from './Content.js';
import useFetch from './Hooks/useFetch.js';
import useDebounce from './Hooks/useDebounce.js';
import style from './style/search.module.css';

const Search = () => {
  const [location, setLocation] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  const [placeholderCity, setPlaceholderCity] = useState(null);
  const [LocationEnable, setLocationEnable] = useState(false);
  const [data, setData] = useState(null);

  const { request } = useFetch();

  const debouncedSearchValue = useDebounce(searchValue, 1000);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setLocationEnable(true);
        }
      );
    } else {
    }
  }, []);

  useEffect(() => {
    const setDefaultWeatherForecast = async () => {
      if (location) {
        const { latitude, longitude } = location;
        const geoLocationResponse = await request(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=4a4408f51dea4075bc35dcf06cf0bcd6`
        );
        const geoLocationCity =
          geoLocationResponse.json.results[0].components.city;
        setPlaceholderCity(geoLocationCity);
        const formattedGeoLocationCity = geoLocationCity.replaceAll(' ', '+');
        const apiKey = '772920597e4ec8f00de8d376dfb3f094';
        const weatherForecastResponse = await request(
          `https://api.openweathermap.org/data/2.5/forecast?q=${formattedGeoLocationCity}&units=metric&lang=pt_br&appid=${apiKey}`
        );
        setData(weatherForecastResponse.json);
      }
    };
    setDefaultWeatherForecast();
  }, [location]);

  function handleChange(event) {
    setSearchValue(event.target.value);
  }

  useEffect(() => {
    if (debouncedSearchValue) {
      const searchHandler = async () => {
        const formattedSearchValue = debouncedSearchValue.replaceAll(' ', '+');

        const apiKey = '772920597e4ec8f00de8d376dfb3f094';
        const weatherForecastResponse = await request(
          `https://api.openweathermap.org/data/2.5/forecast?q=${debouncedSearchValue}&units=metric&lang=pt_br&appid=${apiKey}`
        );
        setData(weatherForecastResponse.json);
      };
      searchHandler();
    }
  }, [debouncedSearchValue]);

  return (
    <>
      {LocationEnable && (
        <div className={style.search__erro}>
          Para melhor Utilizar o serviço, ative a geolocalização!
        </div>
      )}
      <div className={style.teste}>
        <input
          onChange={handleChange}
          placeholder={placeholderCity}
          onClick={() => setLocationEnable(false)}
          data-search={'('}
          className={style.search__bar}
        ></input>
      </div>
      <Content data={data} />
    </>
  );
};

export default Search;
