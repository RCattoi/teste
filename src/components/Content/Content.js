import React, { useState, useEffect } from "react";
import filterForecastData from "../../Utils/filterForecastData";
import getNextThreeDays from "../../Utils/getNextThreeDays";
import setBackgroundColor from "../../Utils/setBackgroundColor";
// Se você não vai usar mais de um modulo no arquivo, pode exportar default direto de la
import tempConverter from "../../Utils/temperatureConverter";
import ContentSection from "./ContentSection/";

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

  const { today, tomorrow, dayAfterTomorrow } = setBackgroundColor(
    forecast,
    isCelsius
  );
  // O uso de arrow function é mais comum e declarar funções com const prevê problemas com reatribuição de dados pra um mesmo nome
  const handleClick = () => {
    const convertedForecast = tempConverter(forecast, isCelsius);
    setIsCelsius(!isCelsius);
    setForecast(convertedForecast);
  };
  return (
    <>
      <div className={styles.forecastContainer}>
        {/* Aqui poderia ter uma estrutura de componente que economizaria duplicação de código */}
        {/* Do jeito que eu eu coloquei aqui não chega a funcionar porque ia ter que mudar a esturuta do código,*/}
        {forecast && (
          <div
            className={`${styles[tomorrow]} ${styles[tomorrow]} ${styles.forecastContainer__weatherWidget}`}
          >
            {Object.keys(forecast).map((a) => (
              <ContentSection
                forecastData={forecast[a]}
                handleClick={() => handleClick()}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
export default Content;
