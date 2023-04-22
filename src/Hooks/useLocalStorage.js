import React, { useState } from 'react';

const useLocalStorage = () => {
  const getLocalStorage = () => {
    const keys = ['bingImageDate', 'bingImageUrl'];
    const imageDateValue = localStorage.getItem(keys[0]);
    const imageUrlValue = localStorage.getItem(keys[1]);
    return { imageUrlValue, imageDateValue };
  };

  return { getLocalStorage };
};
export default useLocalStorage;
