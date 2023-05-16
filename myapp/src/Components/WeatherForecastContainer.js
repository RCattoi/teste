import React, { useEffect, useState } from 'react';
import style from '../style/content.module.css';
import { tempConverter } from '../Utils/temperatureConverter.js';
import setBackgroundColor from '../Utils/setBackgroundColor.js';

// import setBackgroundColor from '../Utils/setBackgroundColor';

const WeatherForecastContainer = (props) => {
  const [isCelsius, setIsCelsius] = useState(props.isCelsius);
  const [forecast, setForecast] = useState(props.forecast);
  const [forecastEmpty, setForecastEmpty] = useState({
    today: '',
    tomorrow: '',
    dayAfterTomorrow: '',
  });

  useEffect(() => {
    if (forecast) {
      setForecast(props.forecast);
      setIsCelsius(true);
    }
  }, [props.forecast]);

  const handleClick = () => {
    const convertedForecast = tempConverter(forecast, isCelsius);
    setIsCelsius(!isCelsius);
    setForecast(convertedForecast);
  };
  if (!forecast) {
    return (
      <>
        {Object.keys(forecastEmpty).map((day, index) => {
          return (
            <div
              className={`${style.forecastContainer__noGeoLocation} ${style[day]}`}
              style={setBackgroundColor(forecast, isCelsius)[index]}
            ></div>
          );
        })}
      </>
    );
  }
  return (
    forecast &&
    Object.keys(forecast).map((day, index) => {
      const { temp, description, icon, wind, pressure, humidity } =
        forecast[day];
      return (
        <>
          <div
            style={setBackgroundColor(forecast, isCelsius)[index]}
            className={`${style.forecastContainer__weatherWidget} ${style[day]}`}
            key={day}
          >
            <div>
              <p
                data-icon={icon}
                className={`${style.forecastContainer__icon} ${style[day]}`}
              ></p>
            </div>
            <div
              className={`${style.forecastContainer__list} ${style.forecastContainer__content}`}
            >
              {day === 'today' ? <p>HOJE</p> : ''}
              {day === 'tomorrow' ? <p>AMANHÃ</p> : ''}
              {day === 'dayAfterTomorrow' ? <p>DEPOIS DE AMANHÃ</p> : ''}
              <p
                className={`${style.forecastContainer__temp}  ${style[day]}`}
                onClick={handleClick}
              >
                {temp}
              </p>
              <p>{description}</p>
              {wind && (
                <ul>
                  <li>Vento: {wind}</li>
                  <li>Pressão: {pressure}</li>
                  <li>Humidade: {humidity}</li>
                </ul>
              )}
            </div>
          </div>
        </>
      );
    })
  );
};

export default WeatherForecastContainer;
