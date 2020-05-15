import { useState, useEffect } from "react";
import axios from "react-native-axios";

const url = "https://reactnd-books-api.udacity.com";

let token = localStorage.token;
if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  Accept: "application/json",
  Authorization: token,
};

const callAPI = axios.create({
  baseURL: url,
  timeout: 1000,
  headers: headers,
});

export default function useWeather(lat, lon) {
  const [data, setData] = useState([]);
  useEffect(() => {
    callAPI
      .get("/books")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        // handle error
        console.log(err);
      })
      .then(() => {
        // always executed
      });
  }, []);

  return { isLoading: false, data };
}
