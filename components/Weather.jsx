import React from "react";
import { isSameDay, format } from "date-fns";
import Card from "./Card";
import {
  Container,
  CurrentDay,
  City,
  BigText,
  BigIcon,
  Temp,
  Description,
  Week,
} from "./Styles";

const Weather = ({ forecast: { name, list } }) => {
  const currentWeather = list.filter((day) => {
    const dt = new Date(day.dt_txt);
    const now = new Date();
    return isSameDay(now, dt);
  });

  const daysByHour = list.map((day) => {
    const dt = new Date(day.dt_txt);
    return {
      date: dt,
      hour: dt.getHours(),
      name: format(dt, "EEEE"),
      temp: Math.round(day.main.temp),
      icon: day.weather[0].icon,
    };
  });

  return (
    <Container>
      <CurrentDay>
        <City>{name}</City>
        <BigText>Today</BigText>
        <BigIcon
          source={`${require(`../assets/icons/${currentWeather[0].weather[0].icon}.png`)}`}
        />
        <Temp>{Math.round(currentWeather[0].main.temp)}°C</Temp>
        <Description>{currentWeather[0].weather[0].description}</Description>
      </CurrentDay>
      <Week horizontal={true} showsHorizontalScrollIndicator={false}>
        {daysByHour.map((day, index) => (
          <Card
            key={index}
            icon={day.icon}
            name={day.name.substring(0, 3)}
            temp={day.temp}
            hour={day.hour}
          />
        ))}
      </Week>
    </Container>
  );
};
export default Weather;
