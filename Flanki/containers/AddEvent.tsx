import React, { useState } from "react";
import { NavigationStackProp } from "react-navigation-stack";
import { Container, Header, Body, Title, Left, Content } from "native-base";
import { View, TextInput, Text } from "react-native";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

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
          <Icon name="arrow-left" size={15} color="white" onPress={goToMenu} />
        </Left>
        <Body>
          <Title>Stwórz wydarzenie</Title>
        </Body>
      </Header>
      <Content>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        > 
          <View style={{ flex: 10, width:100 }}>
            <TextInput placeholder="Password" />
            <Icon name="user" size={24} color="black" />
          </View>
        </View>
      </Content>
    </Container>
  );
};
AddEvent.navigationOptions = {
  header: null
};

export default AddEvent;
