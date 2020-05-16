import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import useWeather from "./utils/useWeather";
import Weather from "./components/Weather";

export default function App() {
  const weather = useWeather();
  console.log(weather);
  return (
    <View style={styles.container}>
      {!weather ? <Text>Loading...</Text> : <Weather forecast={weather} />}
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
