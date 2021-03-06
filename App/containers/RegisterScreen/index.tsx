import React, {useState} from 'react';
import {NavigationStackProp} from 'react-navigation-stack';
import {
  Container,
  Content,
  Form,
  Button,
  Text,
  Toast,
  Thumbnail,
  View,
} from 'native-base';
import Input from '../../components/input';
import api from '../../utils/api';
import * as Yup from 'yup';
import {Formik} from 'formik';
import ImageHandler from '../../components/imageHandler';

type Props = {
  navigation: NavigationStackProp;
};

const initialValues = {email: '', username: '', password: ''};

const uri = 'https://facebook.github.io/react-native/docs/assets/favicon.png';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Fill username'),
  password: Yup.string().required('Fill password'),
  email: Yup.string()
    .email('Expected email')
    .required('Fill email'),
});

export const Register = ({navigation}: Props) => {
  const [image, setImage] = useState('');
  const handleSubmit = ({username, password, email}: typeof initialValues) => {
    api
      .register({
        name: username,
        password: password,
        email,
        profileImageBase64: image,
      })
      .then(({ok, data}) => {
        if (ok) {
          Toast.show({
            type: 'success',
            text: 'Zostałeś zarejestrowany',
            buttonText: 'Ok',
          });
          navigation.navigate('AuthStack');
        } else {
          Toast.show({
            type: 'danger',
            //@ts-ignore
            text: data.message || 'Server error try again',
            buttonText: 'Ok',
            duration: 12312312312321,
          });
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  const moveToLogin = () => navigation.navigate('AuthStack');

  return (
    <Container>
      <Content
        contentContainerStyle={{
          justifyContent: 'center',
          flex: 1,
          padding: 20,
        }}>
        <Form>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}>
            {({
              values: {username, password, email},
              errors,
              touched,
              handleSubmit,
              handleChange,
              handleBlur,
            }) => {
              return (
                <>
                  <ImageHandler
                    image={image || uri}
                    setImage={setImage}
                    label="Pick avatar"
                  />
                  <Input
                    value={username}
                    label="Username"
                    onChange={handleChange('username')}
                    error={touched.username && (errors.username as string)}
                    onBlur={handleBlur('username')}
                  />
                  <Input
                    value={email}
                    label="Email"
                    onChange={handleChange('email')}
                    error={touched.email && (errors.email as string)}
                    onBlur={handleBlur('email')}
                  />
                  <Input
                    value={password}
                    isSecure
                    label="Password"
                    onChange={handleChange('password')}
                    onBlur={handleBlur('password')}
                    error={touched.password && (errors.password as string)}
                  />

                  <Button onPress={handleSubmit} block style={{marginTop: 10}}>
                    <Text>Register</Text>
                  </Button>
                </>
              );
            }}
          </Formik>

          <Button onPress={moveToLogin} block style={{marginTop: 10}}>
            <Text>Already have an account?</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

Register.navigationOptions = {
  title: 'Register',
};

export default Register;
