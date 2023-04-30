import React, { useEffect, useState } from 'react';
import useFetch from './Hooks/useFetch.js';
import getFormattedCurrentDate from './Utils/formattedFullCurrentDate.js';

const Background = () => {
  const { request } = useFetch();

  const getLocalStorageValue = () => {
    const keys = ['bingImageUrl', 'bingImageDate'];
    const imageUrlValue = localStorage.getItem(keys[0]);
    const imageDateValue = localStorage.getItem(keys[1]);
    return { imageUrlValue, imageDateValue };
  };

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
