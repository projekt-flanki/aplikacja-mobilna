import React, { useState } from "react";
import { NavigationStackProp } from "react-navigation-stack";
import { Container, Content, Form, Item, Input, Label, Button, Text, Toast } from "native-base";

type Props = {
  navigation: NavigationStackProp;
};

export const Register = ({ navigation }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const inputChangeHandler = (changeFn: (text: string) => void) => (text: string) => changeFn(text);

  const handleSubmit = () => {
    // if (username !== "tajny" && password !== "xd")
    //   Toast.show({
    //     text: "Wrong credentials",
    //     buttonText: "Ok :("
    //   });
    // else {
    //   navigation.navigate("PrivateStack");
    // }
  };

  const moveToLogin = () => navigation.navigate("AuthStack");

  return (
    <Container>
      <Content contentContainerStyle={{ justifyContent: "center", flex: 1, padding: 20 }}>
        <Form>
          <Item regular stackedLabel last>
            <Label>Username</Label>
            <Input value={username} onChangeText={inputChangeHandler(setUsername)} />
          </Item>
          <Item style={{ marginTop: 10 }} regular stackedLabel last>
            <Label>Email</Label>
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
            <Text>Register</Text>
          </Button>
          <Button onPress={moveToLogin} block style={{ marginTop: 10 }}>
            <Text>Already have an account?</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

Register.navigationOptions = {
  title: "Register"
};

export default Register;
