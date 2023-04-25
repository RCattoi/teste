import React, { useState, useEffect } from 'react';
import filterForecastData from './Utils/filterForecastData.js';
import setBackgroundColor from './Utils/setBackgroundColor.js';
import WeatherSetting from './Utils/teste.js';

import content from './style/content.css';

const Content = (props) => {
  const [forecast, setForecast] = useState(null);
  const [temp, setTemp] = useState(null);
  const [classNameBackground, setClassNameBackground] = useState();

  useEffect(() => {
    const todayFullDate = props?.data?.list[0].dt_txt;

    const filteredDays = props?.data?.list.filter((element) => {
      const nextThreeDays = getNextThreeDays(todayFullDate);
      return nextThreeDays.includes(element.dt_txt);
    });

    const formattedForecast = filterForecastData(filteredDays);
    setForecast(formattedForecast);
    setTemp();
  }, [props]);

  function getNextThreeDays(todayFullDate) {
    let arrNextThreeDays = [];
    for (let i = 0; i < 3; i++) {
      let yearMonth = todayFullDate.split('-').slice(0, 2);
      let dayHour = todayFullDate.split('-').pop().split(' ');
      dayHour[0] = parseInt(dayHour[0]) + i;
      dayHour[1] = ` ${dayHour[1]}`;
      let yearMonthStr = yearMonth.join('-');
      let dayHourStr = dayHour.join('');
      let fullDateStr = `${yearMonthStr}-${dayHourStr}`;
      arrNextThreeDays.push(fullDateStr);
    }
    return arrNextThreeDays;
  }
  const classNamesBackground = setBackgroundColor(forecast);
  return (
    <>
      <div className="forecastContainer">
        <div
          className={`${classNamesBackground.today} today  forecastContainer__weatherWidget`}
        >
          {forecast && (
            <>
              <div>
                <p data-icon={forecast.today.icon}></p>
              </div>
              <div className="forecastContainer__content">
                HOJE
                <p
                  className="forecastContainer__temp"
                  onClick={() => console.log('trocou')}
                >
                  {forecast.today.temp} °C
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
              <ul>
                <li>AMANHÃ</li>
                <li onClick={() => console.log('trocou')}>
                  {forecast.today.temp} °C
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
              <ul>
                <li>DEPOIS DE AMANHÃ</li>
                <li onClick={() => console.log('trocou')}>
                  {forecast.today.temp} °C
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
