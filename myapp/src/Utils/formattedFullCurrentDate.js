export const getFormattedCurrentDate = () => {
  const currentDate = new Date();
  const fullYear = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const dayOfMonth = currentDate.getDate();

  const formattedMonth = String(month).padStart(2, '0');
  const formattedDayOfMonth = String(dayOfMonth).padStart(2, '0');

  return `${fullYear}${formattedMonth}${formattedDayOfMonth}`;
};
export default getFormattedCurrentDate;
