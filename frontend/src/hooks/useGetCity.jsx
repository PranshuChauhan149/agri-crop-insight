import React, { useContext } from "react";
import { useEffect } from "react";
import axios from "axios";

import AppContext from "../Context/AppContext";
const useGetCity = async () => {
  const { setUser, setLoaction, setWeather, weather } = useContext(AppContext);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const apikey = import.meta.env.VITE_GEOAPIKEY;
      const tempkey = import.meta.env.VITE_WEATHER_API;

      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${apikey}`
      );
      
      const temp = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=32ae515b87ebe197dae2d622a0fa61a6`
      );
      setWeather(temp.data);
      console.log(result);

      console.log("temp -> ", temp);

      let a = result.data.features[0].properties.state;
      let b = result.data.features[0].properties.state_district;
      const fullloc = a + " " + b;
      setLoaction(fullloc);
    });
  }, []);
};

export default useGetCity;
