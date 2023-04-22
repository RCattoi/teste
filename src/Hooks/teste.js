import React from 'react';

export const useBrowserLocation = () => {
  const successCallback = async (position) => {
    try {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      setLocationEnable(true);
    } finally {
      return { latitude, longitude };
    }
  };

  const errorCallback = (error) => {
    setLocationEnable(false);
  };

  const browserLocation = navigator.geolocation.getCurrentPosition(
    successCallback,
    errorCallback
  );
};
