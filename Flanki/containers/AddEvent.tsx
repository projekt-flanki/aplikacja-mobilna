import React, { useState } from "react";
import { NavigationStackProp } from "react-navigation-stack";
import {
  Container,
  Header,
  Body,
  Title,
  Left,
  Thumbnail,
  Content,
  DatePicker,
  Button,
  Toast,
  Form
} from "native-base";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Input from "../components/input";
import api from "../utils/api";
import * as Yup from "yup";
import { Formik } from "formik";
import dayjs from "dayjs";

type Props = {
  navigation: NavigationStackProp;
};
const initialValues = {
  eventname: "",
  location: "",
  date: "",
  description: "",
  hours: ""
};
const validationSchema = Yup.object().shape({
  eventname: Yup.string().required("Uzupełnij nazwę wydarzenia"),
  location: Yup.string().required("Uzupełnij lokalizacje")
  // date: Yup.string().required("Uzupełnij datę")
});
const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
export const AddEvent = ({ navigation }: Props) => {
  const goToMenu = () => {
    navigation.navigate("AuthStack");
  };

  const handleSubmit = ({ eventname, location, date, description }) => {
    console.log("cd");
    api
      .addEvent({
        name: eventname,
        location: location,
        date: dayjs().toISOString(),
        description: description
      })
      .then(({ ok, data }) => {
        if (ok) {
          Toast.show({
            type: "success",
            text: "Utworzono wydarzenie",
            buttonText: "Ok"
          });
          navigation.navigate("PrivateStack");
        } else {
          Toast.show({
            type: "danger",
            //@ts-ignore
            text: data.message || "Nie udało się utworzyć wydarzenia",
            buttonText: "Ok"
          });
        }
      });
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
      <Content
        contentContainerStyle={{
          justifyContent: "center",
          flex: 1,
          padding: 20
        }}
      >
        <Form>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({
              values: { eventname, description, location, date },
              errors,
              touched,
              handleSubmit,
              handleChange,
              handleBlur,
              isSubmitting
            }) => {
              return (
                <>
                  <Input
                    value={eventname}
                    label="Nazwa wydarzenia"
                    onChange={handleChange("eventname")}
                    error={touched.eventname && (errors.eventname as string)}
                    onBlur={handleBlur("eventname")}
                  />
                  <Input
                    value={location}
                    label="Lokalizacja wydarzenia"
                    onChange={handleChange("location")}
                    error={touched.location && (errors.location as string)}
                    onBlur={handleBlur("location")}
                  />
                  <Input
                    value={description}
                    label="Opis wydarzenia"
                    onChange={handleChange("description")}
                    error={touched.description && (errors.description as string)}
                    onBlur={handleBlur("description")}
                  />
                  {/* <Input
                    value={hours}
                    label="Wybierz godzinę"
                    onChange={handleChange("hours")}
                    error=""
                    onBlur={handleBlur("hours")}
                  /> */}
                  <Icon name="calendar" />
                  <Text> Wybierz datę</Text>
                  <DatePicker
                    defaultDate={new Date()}
                    minimumDate={new Date()}
                    maximumDate={new Date(2021, 12, 31)}
                    locale={"pl"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"spinner"}
                    placeHolderText={date.length > 0 ? date : "  /  /  "}
                    textStyle={{ color: "#040404" }}
                    placeHolderTextStyle={{
                      color: "#EFF0F3",
                      borderBottomColor: "#B4BEC5",
                      backgroundColor: "#B4BEC5"
                    }}
                    onDateChange={handleChange("date")}
                    disabled={false}
                  />
                  {/* <Icon name="paperclip" />
                  <Text> Wybierz zdjęcie do wydarzenia</Text>
                  <Thumbnail small source={{ uri }} /> */}
                  <Button onPress={handleSubmit} full style={{ marginTop: 10 }}>
                    <Text>Utwórz wydarzenie</Text>
                  </Button>
                </>
              );
            }}
          </Formik>
        </Form>
      </Content>
    </Container>
  );
};
AddEvent.navigationOptions = {
  header: null
};

export default AddEvent;
