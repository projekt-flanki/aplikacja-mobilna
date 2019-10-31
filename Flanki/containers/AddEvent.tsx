import React, { useState } from "react";
import { NavigationStackProp } from "react-navigation-stack";
import {
  Container,
  Header,
  Body,
  Title,
  Left,
  Button,
  Right,
  
} from "native-base";

import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
    navigation: NavigationStackProp;
};

  
export const AddEvent = ({ navigation }) => {
  const goToMenu = () => {
    navigation.navigate("AuthStack");
   
  };
  return (
    <Container>
      <Header>
      <Left>
        
  
        <Icon
          name="arrow-left"
          size={15}
            color="white"
            onPress={goToMenu}
        />
      
      
            </Left>
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