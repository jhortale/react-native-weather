import { useState, useEffect } from "react";
import axios from "axios";
import { storeWeather, getWeather } from "./storeWeather";
import useGeoLocation from "./useGeoLocation";

// // fetch api with axios
const url = "https://api.openweathermap.org/data/2.5";

let key = process.env.API_KEY;

const headers = {
  Accept: "application/json",
  // Authorization: token,
};

const callAPI = axios.create({
  baseURL: url,
  timeout: 1000,
  // headers: headers,
});

export default function useWeather(lat, lon) {
  const [weather, setWeather] = useState(null);

  const latLon = useGeoLocation();

  useEffect(() => {
    if (latLon) {
      fetchAPI(...latLon);
    }
  }, [latLon]);

  const fetchAPI = (lat, lon) => {
    callAPI
      .get(`/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${key}`)
      .then((res) => {
        const dataAPI = {
          id: res.data.city.id,
          name: res.data.city.name,
          country: res.data.city.country,
          timezone: res.data.city.timezone,
          coord: {
            lat: res.data.city.coord.lat,
            lon: res.data.city.coord.lon,
          },
          list: res.data.list,
        };
        storeWeather(dataAPI);
        return getWeather();
      })
      .then((data) => {
        setWeather(data);
      })
      .catch((err) => {
        getWeather().then(setWeather);
        console.log(err);
      });
  };

  return weather;
}
