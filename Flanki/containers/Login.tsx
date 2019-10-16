import React, { useState } from "react";
import { NavigationStackProp } from "react-navigation-stack";
import { Container, Content, Form, Item, Input, Label, Button, Text, Toast } from "native-base";
import api from "../utils/api";

type Props = {
  navigation: NavigationStackProp;
};

export const Login = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputChangeHandler = (changeFn: (text: string) => void) => (text: string) => changeFn(text);

  const handleSubmit = () => {
    api
      .login({
        email,
        password: password
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
      <Content contentContainerStyle={{ justifyContent: "center", flex: 1, padding: 20 }}>
        <Form>
          <Item regular stackedLabel last>
            <Label>Username</Label>
            <Input value={email} onChangeText={inputChangeHandler(setEmail)} />
          </Item>
          <Item style={{ marginTop: 10 }} regular stackedLabel last>
            <Label>Password</Label>
            <Input
              secureTextEntry
              value={password}
              onChangeText={inputChangeHandler(setPassword)}
            />
          </Item>
          <Button onPress={handleSubmit} block style={{ marginTop: 10 }}>
            <Text>Login</Text>
          </Button>
          <Button onPress={moveToRegister} block style={{ marginTop: 10 }}>
            <Text>Register</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

Login.navigationOptions = {
  title: "Login"
};

export default Login;
