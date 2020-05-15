import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
// import * as SQLite from "expo-sqlite";
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
        fetchWeather(position.coords.latitude, position.coords.longitude);
        console.log(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        setData({
          error: "Error Gettig Weather Condtions",
        });
      }
    );
  }, []);

  const url = "https://api.openweathermap.org/data/2.5";

  let key = "109ec75cabfcbbed3d014b7166ad30bd";

  const headers = {
    Accept: "application/json",
    // Authorization: token,
  };

  const callAPI = axios.create({
    baseURL: url,
    timeout: 1000,
    //   // headers: headers,
  });

  const fetchWeather = (lat, lon) => {
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
  // connect Database
  const storeWeather = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@storage_Key", jsonValue);
      console.log(JSON.parse(jsonValue));
      await setWeather(JSON.parse(jsonValue));
    } catch (e) {
      // saving error
    }
  };

  const getWeather = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@storage_Key");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  // const storeWeather = (value) => {
  //   const db = SQLite.openDatabase({ name: "weather.db" });
  //   db.transaction((txn) => {
  //     txn.executeSql(
  //       "SELECT name FROM sqlite_master WHERE type='table' AND name='weather'",
  //       [],
  //       function (tx, res) {
  //         console.log("item:", res.rows.length);
  //         if (res.rows.length === 0) {
  //           txn.executeSql("DROP TABLE IF EXISTS weather", []);
  //           txn.executeSql(
  //             "CREATE TABLE weather(id INTEGER  NOT NULL PRIMARY KEY,name VARCHAR(12) NOT NULL,country VARCHAR(2) NOT NULL,timezone INTEGER  NOT NULL,lat NUMERIC(8,4) NOT NULL,lon NUMERIC(8,4) NOT NULL,dt INTEGER  NOT NULL,temp NUMERIC(5,1) NOT NULL,main VARCHAR(4) NOT NULL,description VARCHAR(10) NOT NULL,icon VARCHAR(3) NOT NULL"
  //           );
  //           //  INSERT INTO weather(id,name,country,timezone,lat,lon,dt,temp,main,description,icon) VALUES (500,'Belford Roxo','BR',-10800,-22.7642,-43.3994,1589533200,293.1,'Rain','light rain','10n');
  //         }
  //       }
  //     );
  //   });
  // };

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
