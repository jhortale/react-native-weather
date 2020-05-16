import React from "react";
import { StyleSheet, Text, View } from "react-native";
import useWeather from "./utils/useWeather";
import Loading from "./components/Loading";
import Weather from "./components/Weather";

export default function App() {
  const weather = useWeather();
  return (
    <View style={styles.container}>
      {!weather ? <Loading /> : <Weather forecast={weather} />}
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
