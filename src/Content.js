import React, { useState, useEffect } from 'react';

const Content = (props) => {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const todayFullDate = props?.data?.list[0].dt_txt;
    const filteredDays = props?.data?.list.filter((element) => {
      const nextThreeDays = getNextThreeDays(todayFullDate);
      return nextThreeDays.includes(element.dt_txt);
    });
    setForecast(filteredDays);
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
  console.log(forecast);
  return (
    <>
      {forecast && (
        <>
          <div>
            {forecast[0].main.temp} -{forecast[0].main.pressure} -
            {forecast[0].main.humidity}
          </div>
          <div>{forecast[1].main.temp}</div>
          <div>{forecast[2].main.temp}</div>
        </>
      )}
    </>
  );
};

export default Content;
