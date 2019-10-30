import React, { useState } from "react";
import { NavigationStackProp } from "react-navigation-stack";
import {
  Container,
  Header,
  Body,
  Title,
  Left,
  Right,
  Content,
  DatePicker
} from "native-base";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Input from "../components/input";

type Props = {
  navigation: NavigationStackProp;
};

export const AddEvent = ({ navigation }: Props) => {
  const goToMenu = () => {
    navigation.navigate("AuthStack");
  };
  const emptyFunction = () => {};
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
      <Content
        contentContainerStyle={{
          justifyContent: "center",
          flex: 1,
          padding: 20
        }}
      >
        <Input
          value=""
          label="Nazwa wydarzenia"
          onChange={emptyFunction}
          error="Wypełnij poprawną nazwe"
          onBlur={emptyFunction}
        />
        <Input
          value=""
          label="Lokalizacja wydarzenia"
          onChange={emptyFunction}
          error="Wypełnij poprawną lokalizacje"
          onBlur={emptyFunction}
        />
        <Input
          value=""
          label="Opis wydarzenia"
          onChange={emptyFunction}
          error="Wypełnij poprawny opis"
          onBlur={emptyFunction}
        />

        <View style={{ flex: 0, flexDirection: "row", alignItems: "center"  }}>
          <Icon name="calendar" />
          <Text> Wybierz datę</Text>
          <Text>                  </Text>
          <DatePicker
            
            defaultDate={new Date(2019, 4, 4)}
            minimumDate={new Date(2019, 1, 1)}
            maximumDate={new Date(2019, 12, 31)}
            locale={"pl"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"spinner"}
            placeHolderText="  /  /  "
            textStyle={{ color: "#040404" }}
            placeHolderTextStyle={{ color: "#EFF0F3",borderBottomColor: "#B4BEC5", backgroundColor: "#B4BEC5"  }}
            onDateChange={this.setDate}
            disabled={false}
          />
        </View>

        {/* <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View style={{ width: 100, height: 50 }}>
            <Icon name="user" size={24} color="black" style={{ width: 40 }} />
            <Input 
              value="XD"
              label="Nazwa wydarzenia"
              onChange={goToMenu}
              error="xd"
              onBlur={goToMenu}
            />
          </View>
          
        </View> */}
      </Content>
    </Container>
  );
};
AddEvent.navigationOptions = {
  header: null
};

export default AddEvent;
