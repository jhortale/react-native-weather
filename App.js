import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as SQLite from "expo-sqlite";
import axios from "axios";
// import * as WeatherAPI from "./utils/WeatherApi";
import Weather from "./components/Weather";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [weather, setWeather] = useState({
    error: null,
    data: [],
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        getWeather(position.coords.latitude, position.coords.longitude);
        console.log(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        setData({
          error: "Error Gettig Weather Condtions",
        });
      }
    );
  }, []);

  const url = "http://apiadvisor.climatempo.com.br/";

  let key = "109ec75cabfcbbed3d014b7166ad30bd";

  const headers = {
    Accept: "application/json",
    // Authorization: token,
  };

  // const callAPI = axios.create({
  //   baseURL: url,
  //   timeout: 1000,
  //   // headers: headers,
  // });

  const getWeather = (lat, lon) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`
      )
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
        setWeather(dataAPI);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      {isLoading ? <Text>Loading...</Text> : <Weather />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
