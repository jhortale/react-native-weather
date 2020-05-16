import React from "react";
import { Container, BigText, BigIcon, Description } from "./Styles";

const Loading = (props) => {
  return (
    <Container>
      <BigText>Welcome!</BigText>
      <BigIcon source={require("../assets/icons/01d.png")} />
      <Description>Loading...</Description>
    </Container>
  );
};
export default Loading;
