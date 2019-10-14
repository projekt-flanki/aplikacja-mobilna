import React, { useState } from 'react'
import { NavigationStackProp } from 'react-navigation-stack';
import { Container, Content, Form, Item, Input, Label, Button, Text, Toast } from 'native-base';

type Props = {
  navigation: NavigationStackProp
}
export const Login = ({ navigation }: Props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const inputChangeHandler = (changeFn: (text: string) => void) => (text: string) => changeFn(text)

  const handleSubmit = () => {
    if (username !== 'tajny' && password !== 'xd')
      Toast.show({
        text: "Wrong credentials",
        buttonText: "Ok :("
      })
    else {
      navigation.navigate('PrivateStack')
    }
  }

  return <Container>
    <Content contentContainerStyle={{ justifyContent: 'center', flex: 1, padding: 20 }}>
      <Form >
        <Item floatingLabel last>
          <Label>Username</Label>
          <Input value={username} onChangeText={inputChangeHandler(setUsername)} />
        </Item>
        <Item floatingLabel last>
          <Label>Password</Label>
          <Input secureTextEntry value={password} onChangeText={inputChangeHandler(setPassword)} />
        </Item>
        <Button onPress={handleSubmit} block style={{ marginTop: 10 }}>
          <Text>Login</Text>
        </Button>
      </Form>
    </Content>
  </Container>
}

export default Login
