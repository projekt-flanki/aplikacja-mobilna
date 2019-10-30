import React, { useState } from "react";
import { NavigationStackProp } from "react-navigation-stack";
import {Container, Content, Form, Button, Text, Toast, Header, Left, Icon, Title, Body, Right} from "native-base";
import { Formik } from 'formik'
import Input from '../components/input'
import * as Yup from 'yup'
import api from "../utils/api";
import {DrawerActions} from "react-navigation-drawer";

type Props = {
  navigation: NavigationStackProp;
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Fill usedrname'),
  password: Yup.string().required('Fill password')
})


export const Login = ({ navigation }: Props) => {
  const initialValues = { username: '', password: '' }

  const handleSubmit = ({ username, password }) => {
    api
      .login({
        email: username,
        password
      })
      .then(({ ok, data }) => {
        if (ok) {
          api.setAuthorizationHeader(data as string);
          navigation.navigate("PrivateStack");
        } else {
          Toast.show({
            type: "danger",
            //@ts-ignore
            text: data.message || "Server error try again",
            buttonText: "Ok"
          });
        }
      });
  };

  const moveToRegister = () => navigation.navigate("RegisterStack");

  return (
    <Container>
      <Header>
        <Left>
          <Button
              transparent
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>Zaloguj się</Title>
        </Body>
      </Header>
      <Content contentContainerStyle={{ justifyContent: "center", flex: 1, padding: 20 }}>
        <Form>
          <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
            {({
              values: { username, password },
              errors,
              touched,
              handleSubmit,
              handleChange,
              handleBlur,
              isSubmitting
            }) => {
              return <>
                <Input
                  value={username}
                  label="Username"
                  onChange={handleChange('username')}
                  error={touched.username && (errors.username as string)}
                  onBlur={handleBlur('username')}
                />
                <Input
                  value={password}
                  isSecure
                  label="Password"
                  onChange={handleChange('password')}
                  onBlur={handleBlur('password')}
                  error={touched.password && (errors.password as string)}
                />
                <Button onPress={handleSubmit} block style={{ marginTop: 10 }}>
                  <Text>Login</Text>
                </Button>
              </>
            }}
          </Formik>

          <Button onPress={moveToRegister} block style={{ marginTop: 10 }}>
            <Text>Register</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

Login.navigationOptions = {
  header: null
};

export default Login;
