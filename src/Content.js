import React, { useState, useEffect } from 'react';
import filterForecastData from './Utils/filterForecastData.js';
import setBackgroundColor from './Utils/setBackgroundColor.js';
import { tempConverter } from './Utils/temperatureConverter.js';

import content from './style/content.css';

const Content = (props) => {
  const [forecast, setForecast] = useState(null);
  const [temp, setTemp] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const [classNamesBackground, setClassNamesBackground] = useState({
    today: 'forecastContainer__noGeoLocation',
    tomorrow: 'forecastContainer__noGeoLocation',
    dayAfterTomorrow: 'forecastContainer__noGeoLocation',
  });
  useEffect(() => {
    const todayFullDate = props?.data?.list[0]?.dt_txt;
    const filteredDays = props?.data?.list.filter((element) => {
      const nextThreeDays = getNextThreeDays(todayFullDate);
      return nextThreeDays.includes(element.dt_txt);
    });
    const formattedForecast = filterForecastData(filteredDays);
    setForecast(formattedForecast);
    setIsCelsius(true);
  }, [props]);

  function getNextThreeDays(todayFullDate) {
    const firstDate = new Date(todayFullDate);
    const dayMonth = [31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 31];

    const result = [todayFullDate];

    for (let i = 1; i <= 2; i++) {
      let newDate = new Date(firstDate.getTime() + i * 24 * 60 * 60 * 1000);

      if (newDate.getMonth() === 1 && newDate.getDate() === 28) {
        newDate.setDate(newDate.getDate() + 2);
      } else if (
        dayMonth[newDate.getMonth()] === 30 &&
        newDate.getDate() === 31
      ) {
        newDate.setDate(30);
      }
      const novaDataFormatada =
        newDate.toISOString().slice(0, 10) + ' ' + todayFullDate.slice(11);

      result.push(novaDataFormatada);
    }

    return result;
  }

  useEffect(() => {
    if (isCelsius) {
      const backgroundClass = setBackgroundColor(forecast, isCelsius);
      setClassNamesBackground(backgroundClass);
    }
  }, [forecast]);

  function handleClick() {
    const convertedForecast = tempConverter(forecast, isCelsius);
    setIsCelsius(!isCelsius);
    setForecast(convertedForecast);
  }

  if (!forecast) {
    return (
      <>
        <div
          className={`${classNamesBackground.today} today  forecastContainer__weatherWidget`}
        ></div>
        <div
          className={`${classNamesBackground.tomorrow} tomorrow  forecastContainer__weatherWidget`}
        ></div>
        <div
          className={`${classNamesBackground.dayAfterTomorrow} dayAfterTomorrow  forecastContainer__weatherWidget`}
        ></div>
      </>
    );
  }
  return (
    <>
      <div className={'forecastContainer'}>
        <div
          className={`${classNamesBackground.today} today  forecastContainer__weatherWidget`}
        >
          {forecast && (
            <>
              <div>
                <p
                  className="forecastContainer__icon"
                  data-icon={forecast.today.icon}
                ></p>
              </div>
              <div className="forecastContainer__list forecastContainer__content">
                HOJE
                <p
                  className="forecastContainer__temp forecastContainer__changeIcon"
                  onClick={handleClick}
                >
                  {forecast.today.temp}
                </p>
                <p>{forecast.today.description}</p>
                <ul>
                  <li>Vento: {forecast.today.wind}</li>
                  <li>Pressão: {forecast.today.pressure}</li>
                  <li>Humidade: {forecast.today.humidity}</li>
                </ul>
              </div>
            </>
          )}
        </div>
        <div
          className={`${classNamesBackground.tomorrow} tomorrow forecastContainer__weatherWidget`}
        >
          {forecast && (
            <>
              <div>
                <p
                  className="forecastContainer__icon--secondary"
                  data-icon={forecast.tomorrow.icon}
                ></p>
              </div>
              <ul className="forecastContainer__list">
                <li>AMANHÃ</li>
                <li
                  className="forecastContainer__changeIcon"
                  onClick={handleClick}
                >
                  {forecast.tomorrow.temp}
                </li>
                <li>{forecast.tomorrow.description}</li>
              </ul>
            </>
          )}
        </div>
        <div
          className={`${classNamesBackground.dayAfterTomorrow} dayAfterTomorrow forecastContainer__weatherWidget`}
        >
          {forecast && (
            <>
              <div>
                <p
                  className="forecastContainer__icon--secondary"
                  data-icon={forecast.dayAfterTomorrow.icon}
                ></p>
              </div>
              <ul className="forecastContainer__list">
                <li className="forecastContainer__period">DEPOIS DE AMANHÃ</li>
                <li
                  className="forecastContainer__changeIcon"
                  onClick={handleClick}
                >
                  {forecast.dayAfterTomorrow.temp}
                </li>
                <li>{forecast.dayAfterTomorrow.description}</li>
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Content;
