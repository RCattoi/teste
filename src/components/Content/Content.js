import React, { useState, useEffect } from "react";
import filterForecastData from "../../Utils/filterForecastData.js";
import setBackgroundColor from "../../Utils/setBackgroundColor.js";
import { tempConverter } from "../../Utils/temperatureConverter.js";

import styles from "./content.module.css";

const Content = (props) => {
  const [forecast, setForecast] = useState(null);
  const [temp, setTemp] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const [classNameBackground, setClassNameBackground] = useState();
  useEffect(() => {
    const todayFullDate = props?.data?.list[0].dt_txt;

    const filteredDays = props?.data?.list.filter((element) => {
      const nextThreeDays = getNextThreeDays(todayFullDate);
      return nextThreeDays.includes(element.dt_txt);
    });

    const formattedForecast = filterForecastData(filteredDays);
    setForecast(formattedForecast);
  }, [props]);

  function getNextThreeDays(todayFullDate) {
    let arrNextThreeDays = [];
    for (let i = 0; i < 3; i++) {
      let yearMonth = todayFullDate.split("-").slice(0, 2);
      let dayHour = todayFullDate.split("-").pop().split(" ");
      dayHour[0] = parseInt(dayHour[0]) + i;
      dayHour[1] = ` ${dayHour[1]}`;
      let yearMonthStr = yearMonth.join("-");
      let dayHourStr = dayHour.join("");
      let fullDateStr = `${yearMonthStr}-${dayHourStr}`;
      arrNextThreeDays.push(fullDateStr);
    }
    return arrNextThreeDays;
  }
  const { today, tomorrow, dayAfterTomorrow } = setBackgroundColor(
    forecast,
    isCelsius
  );

  function handleClick() {
    const convertedForecast = tempConverter(forecast, isCelsius);
    setIsCelsius(!isCelsius);
    setForecast(convertedForecast);
  }
  return (
    <>
      <div className={styles.forecastContainer}>
        <div
          className={`${styles[today]} ${styles.today} ${styles.forecastContainer__weatherWidget}`}
        >
          {forecast && (
            <>
              <div>
                <p className={styles.teste} data-icon={forecast.today.icon}></p>
              </div>
              <div
                className={`${styles.forecastContainer__list} ${styles.forecastContainer__content}`}
              >
                HOJE
                <p
                  className={`${styles.forecastContainer__temp} ${styles.forecastContainer__changeIcon}`}
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
          className={`${styles[tomorrow]} ${styles.tomorrow} ${styles.forecastContainer__weatherWidget}`}
        >
          {forecast && (
            <>
              <div>
                <p
                  className={styles.forecastContainer__icon___secondary}
                  data-icon={forecast.tomorrow.icon}
                ></p>
              </div>
              <ul className={styles.forecastContainer__list}>
                <li>AMANHÃ</li>
                <li
                  className={styles.forecastContainer__changeIcon}
                  onClick={handleClick}
                >
                  {forecast.today.temp}
                </li>
                <li>{forecast.tomorrow.description}</li>
              </ul>
            </>
          )}
        </div>
        <div
          className={`${styles[dayAfterTomorrow]} ${styles.dayAfterTomorrow} ${styles.forecastContainer__weatherWidget}`}
        >
          {forecast && (
            <>
              <div>
                <p
                  className={styles.forecastContainer__icon___secondary}
                  data-icon={forecast.dayAfterTomorrow.icon}
                ></p>
              </div>
              <ul className={styles.forecastContainer__list}>
                <li className={styles.forecastContainer__period}>
                  DEPOIS DE AMANHÃ
                </li>
                <li
                  className={styles.forecastContainer__changeIcon}
                  onClick={handleClick}
                >
                  {forecast.today.temp}
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
