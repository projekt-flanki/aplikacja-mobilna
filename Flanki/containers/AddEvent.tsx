import React, { useState } from "react";
import { NavigationStackProp } from "react-navigation-stack";
import {
  Container,
  Header,
  Body,
  Title,
} from "native-base";

type Props = {
    navigation: NavigationStackProp;
};
  
export const AddEvent = ({ navigation }) => {
  return (
    <Container>
      <Header>
        <Body>
          <Title>Stwórz wydarzenie</Title>
        </Body>
        
      </Header>
      
    </Container>);
};
AddEvent.navigationOptions = {
  header: null
};

export default AddEvent;