const tempConverter = (objTemp, tempMetric) => {
  let newObjTemp = objTemp;
  if (tempMetric) {
    for (const key in objTemp) {
      const temp = objTemp[key].temp;
      const tempNumber = parseInt(temp.replaceAll(" °C", ""));
      const tempFarenheit = `${Math.round(tempNumber * 1.8 + 32)} °F`;
      newObjTemp[key].temp = tempFarenheit;
    }
    return newObjTemp;
  } else {
    for (const key in objTemp) {
      const temp = objTemp[key].temp;
      const tempNumber = parseInt(temp.replaceAll(" °F", ""));
      const tempCelsius = `${Math.round((tempNumber - 32) * 0.55)} °C`;
      newObjTemp[key].temp = tempCelsius;
    }
    return newObjTemp;
  }
};

export default tempConverter;
