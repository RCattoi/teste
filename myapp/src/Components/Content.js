import React, { useState, useEffect } from 'react';
import WeatherForecastContainer from './WeatherForecastContainer.js';

import getNextThreeDays from '../Utils/getNextThreeDays.js';
import filterForecastData from '../Utils/filterForecastData.js';

const Content = (props) => {
  const [forecast, setForecast] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);

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

  if (!forecast) {
    return <WeatherForecastContainer forecast={forecast} />;
  }
  return (
    <>
      <div className={'forecastContainer'}>
        <WeatherForecastContainer forecast={forecast} isCelsius={isCelsius} />
      </div>
    </>
  );
};
export default Content;
