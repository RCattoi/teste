import Error from '../Components/Error.js';
import React, { useEffect, useState } from 'react';
import Content from '../Components/Content.js';
import {
  getForecastLocalStorage,
  saveForeCastLocalStorage,
  deleteForeCastLocalStorage,
} from '../Utils/weatherForecastLocalStorage.js';
import useFetch from '../Hooks/useFetch.js';
import useDebounce from '../Hooks/useDebounce.js';
import style from '../style/search.module.css';

const Search = () => {
  const [location, setLocation] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  const [placeholderCity, setPlaceholderCity] = useState(null);
  const [LocationEnable, setLocationEnable] = useState(false);
  const [data, setData] = useState(null);
  const [errorRequest, setErrorRequest] = useState(false);

  const { request } = useFetch();

  const debouncedSearchValue = useDebounce(searchValue, 1000);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationEnable(true)
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setLocationEnable(false);
        }
      );
    } else {
    }
  }, []);

  useEffect(() => {
    deleteForeCastLocalStorage();
  }, []);

  useEffect(() => {
    const setDefaultWeatherForecast = async () => {
      if (location && location.latitude && location.longitude) {
        const { latitude, longitude } = location;
        const geoLocationResponse = await request(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.REACT_APP_OPEN_CAGE_API_KEY}`
        );

        const geoLocationCity =
          geoLocationResponse.json.results[0].components.city;
        setPlaceholderCity(geoLocationCity);
        const formattedGeoLocationCity = geoLocationCity
          .replaceAll(' ', '+')
          .toLowerCase();
        const foreCastLocalStorage = getForecastLocalStorage(
          formattedGeoLocationCity
        );
        if (foreCastLocalStorage) {
          const jsonForeCastLocalStorage = JSON.parse(foreCastLocalStorage);
          setData(jsonForeCastLocalStorage);
        } else {
          const weatherForecastResponse = await request(
            `https://api.openweathermap.org/data/2.5/forecast?q=${formattedGeoLocationCity}&units=metric&lang=pt_br&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
          );

          setData(weatherForecastResponse.json);
          saveForeCastLocalStorage(
            formattedGeoLocationCity,
            weatherForecastResponse.json
          );
        }
      }
    };
    setDefaultWeatherForecast();
  }, [location]);

  function handleChange(event) {
    setSearchValue(event.target.value);
    setErrorRequest(false);
    setLocation(true);
  }

  useEffect(() => {
    if (debouncedSearchValue) {
      const searchHandler = async () => {
        const formattedSearchValue = debouncedSearchValue
          .replaceAll(' ', '+')
          .toLowerCase();
        const foreCastLocalStorage =
          getForecastLocalStorage(formattedSearchValue);
        if (foreCastLocalStorage) {
          const jsonForeCastLocalStorage = JSON.parse(foreCastLocalStorage);
          setData(jsonForeCastLocalStorage);
        } else {
          const weatherForecastResponse = await request(
            `https://api.openweathermap.org/data/2.5/forecast?q=${formattedSearchValue}&units=metric&lang=pt_br&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
          );
          setData(weatherForecastResponse.json);
          setErrorRequest(!weatherForecastResponse.json);
          saveForeCastLocalStorage(
            formattedSearchValue,
            weatherForecastResponse.json
          );
        }
      };
      searchHandler();
    }
  }, [debouncedSearchValue, request]);

  function handleClick() {
    setLocationEnable(true);
    setErrorRequest(false);
  }
  return (
    <>
      {errorRequest && (
        <Error name={'Cidade não encontrada, pesquise novamente!'} />
      )}
      {!LocationEnable && (
        <Error
          name={'Para melhor Utilizar o serviço, ative a geolocalização!'}
        />
      )}
      <div className={style.search}>
        <input
          onChange={handleChange}
          placeholder={placeholderCity}
          onClick={handleClick}
          data-search={'('}
          className={style.search__bar}
        ></input>
      </div>
      <Content data={data} />
    </>
  );
};

export default Search;
