import React, { useState } from 'react';

export const useBrowserLocation = () => {
  const [locationEnable, setLocationEnable] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const getLocation = () => {
    const successCallback = async (position) => {
      try {
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
    return { latitude, longitude };
  };
  return {
    getLocation,
    locationEnable,
    latitude,
    longitude,
  };
};

export default useBrowserLocation;
