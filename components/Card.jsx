import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import styled from "styled-components/native";

const Day = styled.View`
  height: 150px;
  width: 75px;
  justify-content: center;
  align-items: center;
`;

const SmallIcon = styled.Image`
  width: 50px;
  height: 50px;
`;
const SmallText = styled.Text`
  font-size: 20px;
  font-weight: 300;
  color: white;
`;

export default function Card({ name, icon, temp }) {
  return (
    <Day>
      <SmallIcon source={require("../assets/icons/" + icon + ".png")} />
      <SmallText>{name}</SmallText>
      <SmallText>{temp}°C</SmallText>
    </Day>
  );
}
