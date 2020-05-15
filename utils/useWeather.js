import { useState, useEffect } from "react";
import axios from "axios";
import { storeWeather, getWeather } from "./storeWeather";

// const url = "https://reactnd-books-api.udacity.com";

// let token = localStorage.token;
// if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

// const headers = {
//   Accept: "application/json",
//   Authorization: token,
// };

// const callAPI = axios.create({
//   baseURL: url,
//   timeout: 1000,
//   headers: headers,
// });

// export default function useWeather(lat, lon) {
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     callAPI
//       .get("/books")
//       .then((res) => {
//         setData(res.data);
//         console.log(res.data);
//       })
//       .catch((err) => {
//         // handle error
//         console.log(err);
//       })
//       .then(() => {
//         // always executed
//       });
//   }, []);

//   return { isLoading: false, data };
// }
// import axios from "axios";

// // fetch api with axios
const url = "https://api.openweathermap.org/data/2.5";

let key = "SEU-TOKEN"; // se puder faz uma key para vc por favor. a minha só tem poucos fetches e ainda preciso finalizar o UI... https://openweathermap.org/api

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
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    fetchAPI(lat, lon);
  }, []);
  const fetchAPI = (lat, lon) => {
    callAPI
      .get(`/forecast?lat=${lat}&lon=${lon}&appid=${key}`)
      .then((res) => {
        console.log(res.data);
        const dataAPI = {
          city: {
            id: res.data.city.id,
            name: res.data.city.name,
            country: res.data.city.country,
            timezone: res.data.city.timezone,
            coord: {
              lat: res.data.city.coord.lat,
              lon: res.data.city.coord.lon,
            },
          },
          list: res.data.list,
        };
        storeWeather(dataAPI);
        return { isLoading: false };
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        getWeather().then((data) => {
          setWeather(data);
          setIsLoading(false);
        });
      });
  };
  return { isLoading, weather };
}
