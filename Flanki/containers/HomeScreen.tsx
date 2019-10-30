import React, { useEffect, useState } from "react";
import {
    Container,
    Content,
    Text,
    Header,
    Body,
    Right,
    Button,
    Title,
    Thumbnail,
    Spinner, Icon, Left
} from "native-base";
import { NavigationStackProp } from "react-navigation-stack";
import { View } from "react-native";
import api from "../utils/api";
import { UserInfoPayload } from "../typings";
import { ApiResponse } from "apisauce";

type Props = {
  navigation: NavigationStackProp;
};

const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";

const starUri =
  "https://cdn2.iconfinder.com/data/icons/modifiers-add-on-1-flat/48/Mod_Add-On_1-35-512.png";

export const HomeScreen = ({ navigation }: Props) => {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    api.getUserInfo().then(({ data }: ApiResponse<UserInfoPayload>) => {
      setUserName(data.username);
    });
  }, []);
  const logout = () => {
    navigation.navigate("AuthStack");
    api.logout();
  };

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
        {userName.length === 0 && <Spinner />}
        {userName.length > 0 && (
          <>
            <Thumbnail large source={{ uri }} />
            <Text style={{ marginTop: 10 }}>{userName}</Text>
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
          </>
        )}
      </Content>
    </Container>
  );
};

HomeScreen.navigationOptions = {
  header: null
};

export default HomeScreen;
