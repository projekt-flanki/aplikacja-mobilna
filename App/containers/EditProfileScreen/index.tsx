import React, {useEffect, useState} from 'react';
import {NavigationStackProp} from 'react-navigation-stack';
import StarRating from 'react-native-star-rating';
import {
  Container,
  Header,
  Body,
  Title,
  Left,
  Content,
  DatePicker,
  Button,
  Toast,
  Form,
  Icon,
} from 'native-base';
import {Text} from 'react-native';
import Input from '../../components/input';
import {Formik} from 'formik';
import {DrawerActions} from 'react-navigation-drawer';
import api from "../../utils/api";
import {ApiResponse} from "apisauce";
import {UserInfoPayload} from "../../typings";

type Props = {
  navigation: NavigationStackProp;
};
const initialValues = {
  username: '',
  points: '',
};

export const EditProfile = ({navigation}: Props) => {
  const handleSubmit = (): void => {};
  const [starsCount, setStarCount] = useState(2);

  const onStarRatingPress = (rating: any) => {
    setStarCount(rating);
  };

  const [userName, setUserName] = useState('');
  useEffect(() => {
    api.getUserInfo().then(({data, ok}: ApiResponse<any>) => {
      if (ok) {
        const {username, profileImageBase64} = data as UserInfoPayload;
        console.log(profileImageBase64);
        setUserName(username);
      } else {
        Toast.show({
          type: 'danger',
          //@ts-ignore
          text: 'You need to login to access this page',
          buttonText: 'Ok',
        });
      }
    });
  }, []);

  return (
    <Container>
      <Header>
        <Left>
          <Button
            transparent
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>Edytuj profil</Title>
        </Body>
      </Header>
      <Content
        contentContainerStyle={{
          justifyContent: 'center',
          flex: 1,
          padding: 20,
        }}>
        <Form>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({
              values: {username, points, stars},
              errors,
              touched,
              handleSubmit,
              handleChange,
              handleBlur,
              isSubmitting,
            }) => {
              return (
                <>
                  <Input
                    value={username}
                    label="Nazwa użytkownika"
                    onChange={handleChange('username')}
                    // error={touched.eventname && (errors.eventname as string)}
                    onBlur={handleBlur('username')}
                  />
                  <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={starsCount}
                    selectedStar={(rating) => onStarRatingPress(rating)}
                  />
                  <Button onPress={handleSubmit} full style={{marginTop: 10}}>
                    <Text>Zapisz</Text>
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
EditProfile.navigationOptions = {
  header: null,
};

export default EditProfile;
