import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import styled, { ThemeProvider } from "styled-components/native";

import DateConverter from "../utils/DateConverter";
import Card from "./Card";
import theme from "../data/theme";

const Weather = ({ forecast: { id, name, country, timezone, list } }) => {
  const currentWeather = list.filter((day) => {
    const dt = new Date(day.dt_txt);
    const now = new Date();
    let dateCount = +DateConverter.toString(now);
    console.log(dateCount);

    return DateConverter.toString(now) === DateConverter.toString(dt);
  });
  console.log(currentWeather.length);

  const daysByName = list.map((day) => {
    const dt = new Date(day.dt_txt);
    return {
      name: DateConverter.getDayName(day.dt),
      temp: Math.round(day.main.temp),
      icon: day.weather[0].icon,
    };
  });

  const uniqueDays = [...new Set(daysByName)];

  console.log(uniqueDays.length);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <CurrentDay>
          <City>{name}</City>
          <BigText>Today</BigText>
          <BigIcon
            source={require("../assets/icons/" +
              currentWeather[0].weather[0].icon +
              ".png")}
          />
          <Temp>{Math.round(currentWeather[0].main.temp)}°C</Temp>
          <Description>{currentWeather[0].weather[0].description}</Description>
        </CurrentDay>
        <Week horizontal={true} showsHorizontalScrollIndicator={false}>
          {uniqueDays.map((day) => (
            <Card
              icon={day.icon}
              name={day.name.substring(0, 3)}
              temp={day.temp}
            />
          ))}
        </Week>
      </Container>
    </ThemeProvider>
  );
};
export default Weather;
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #272343;
  justify-content: center;
  width: 100%;
  align-items: center;
`;
const CurrentDay = styled.View`
  position: relative;
  flex: 1;
  margin-top: 60px;
  align-items: center;
`;

const City = styled.Text`
  font-size: 22px;
  font-weight: 300;
  color: white;
  padding-bottom: 20px;
`;
const BigText = styled.Text`
  font-size: 35px;
  font-weight: 100;
  color: white;
  padding-bottom: 20px;
`;

const BigIcon = styled.Image`
  width: 168px;
  height: 168px;
  padding-bottom: 40px;
`;

const Temp = styled.Text`
  font-size: 80px;
  font-weight: 100;
  color: #bae8e8;
  padding-bottom: 20px;
`;
const Description = styled.Text`
  font-size: 24px;
  font-weight: 100;
  color: #bae8e8;
  padding-bottom: 20px;
`;

const Week = styled.ScrollView`
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px;
  position: absolute;
  background: black;
`;
