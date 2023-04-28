const getNextThreeDays = (todayFullDate) => {
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
};

export default getNextThreeDays;
