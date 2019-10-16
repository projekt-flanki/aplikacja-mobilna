import React from "react";
import {
  Container,
  Content,
  Text,
  Header,
  Body,
  Right,
  Button,
  Title,
  Thumbnail
} from "native-base";
import { NavigationStackProp } from "react-navigation-stack";
import { View } from "react-native";

type Props = {
  navigation: NavigationStackProp;
};
const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
const starUri =
  "https://cdn2.iconfinder.com/data/icons/modifiers-add-on-1-flat/48/Mod_Add-On_1-35-512.png";
export const HomeScreen = ({ navigation }: Props) => {
  const logout = () => navigation.navigate("AuthStack");
  return (
    <Container>
      <Header>
        <Body>
          <Title>Profil uzytkownika</Title>
        </Body>
        <Right>
          <Button onPress={logout} hasText transparent>
            <Text>Wyloguj się</Text>
          </Button>
        </Right>
      </Header>
      <Content
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          padding: 20
        }}
      >
        <Thumbnail large source={{ uri }} />
        <Text style={{ marginTop: 10 }}>Nazwa</Text>
        <Text style={{ marginTop: 10 }}>Punkty: 1234</Text>
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text>Opinia: </Text>
          <Thumbnail small source={{ uri: starUri }} />
          <Thumbnail small source={{ uri: starUri }} />
          <Thumbnail small source={{ uri: starUri }} />
          <Thumbnail small source={{ uri: starUri }} />
          <Thumbnail small source={{ uri: starUri }} />
        </View>
      </Content>
    </Container>
  );
};

HomeScreen.navigationOptions = {
  header: null
};

export default HomeScreen;
