import React, { useContext } from "react";
import { useEffect } from "react";
import axios from "axios";

import AppContext from "../Context/AppContext";
const useGetCity = async () => {
  const { setUser, setLoaction } = useContext(AppContext);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const apikey = import.meta.env.VITE_GEOAPIKEY;

      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${apikey}`
      );

      let a = result.data.features[0].properties.state;
      let b = result.data.features[0].properties.state_district;
      const fullloc = a + " " + b;
      setLoaction(fullloc);
    });
  }, []);
};

export default useGetCity;
