import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const Weather = (props) => {
  // console.log(data.json);
  // const {
  //   cod,
  //   message,
  //   cnt,
  //   list,
  //   city: { name },
  // } = data;
  return (
    <View>
      <Text>{name}</Text>
      {/* <Text>{`${list[0].dt}/${list[0].main.temp}/${list[0].weather[0].icon}/${list[0].weather[0].main}/${list[0].weather[0].description}`}</Text>
      <ScrollView style={styles.scrollView}>
        {list.slice(1, 7).map((i) => (
          <Text key={i.weather[0].id}>
            {`${i.dt}/${i.main.temp}/${i.weather[0].main}/${i.weather[0].icon}`}
          </Text>
        ))}
      </ScrollView> */}
    </View>
  );
};

Weather.propTypes = {};

export default Weather;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});
