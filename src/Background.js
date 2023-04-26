import React, { useEffect, useState } from 'react';
import useFetch from './Hooks/useFetch.js';

const Background = () => {
  const { request } = useFetch();

  const getLocalStorageValue = () => {
    const keys = ['bingImageUrl', 'bingImageDate'];
    const imageUrlValue = localStorage.getItem(keys[0]);
    const imageDateValue = localStorage.getItem(keys[1]);
    return { imageUrlValue, imageDateValue };
  };

  function getFormattedCurrentDate() {
    const currentDate = new Date();
    const fullYear = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const dayOfMonth = currentDate.getDate();

    const formattedMonth = String(month).padStart(2, '0');
    const formattedDayOfMonth = String(dayOfMonth).padStart(2, '0');

    return `${fullYear}${formattedMonth}${formattedDayOfMonth}`;
  }

  useEffect(() => {
    async function setBackgroudImage() {
      const imgLocalStoreDate = getLocalStorageValue().imageDateValue;
      if (imgLocalStoreDate !== getFormattedCurrentDate()) {
        const response = await request(`http://localhost:8080/bingImgAPI`);
        const { imgUrl, imgStartDate } = response.json;
        localStorage.setItem('bingImageUrl', `https://www.bing.com${imgUrl}`);
        localStorage.setItem('bingImageDate', imgStartDate);
        document.body.style.backgroundImage = `url(${localStorage.getItem(
          'bingImageUrl'
        )})`;
      } else {
        document.body.style.backgroundImage = `url(${localStorage.getItem(
          'bingImageUrl'
        )})`;
      }
    }
    setBackgroudImage();
  }, []);

  return <></>;
};

export default Background;
