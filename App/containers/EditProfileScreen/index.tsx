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
import ImageHandler from "../../components/imageHandler";

type Props = {
  navigation: NavigationStackProp;
};

const uri = 'https://facebook.github.io/react-native/docs/assets/favicon.png';

export const EditProfile = ({navigation}: Props) => {
  const [starsCount, setStarCount] = useState(2);
  const [image, setImage] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');

  const onStarRatingPress = (rating: any) => {
    setStarCount(rating);
  };

  const initialValues = {
    email: email,
    username: userName,
    profileImageBase64: image,
    rating: starsCount
  };

  useEffect(() => {
    api.getUserInfo().then(({data, ok}: ApiResponse<any>) => {
      if (ok) {
        const {username, profileImageBase64, rating, email} = data as UserInfoPayload;
        console.log(profileImageBase64);
        setUserName(username);
        setImage(profileImageBase64);
        setStarCount(rating);
        setEmail(email);
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

  const handleSubmit = ({email, username, profileImageBase64, rating}: typeof initialValues): void => {
    api
        .editUser({
          email: email, username: username, profileImageBase64: profileImageBase64, rating: rating
        })
        .then(({ok, data}) => {
          if (ok) {
            Toast.show({
              type: 'success',
              text: 'Edytowano użytkownika',
              buttonText: 'Ok',
            });
            navigation.navigate('HomeScreenRouter');
          } else {
            Toast.show({
              type: 'danger',
              //@ts-ignore
              text: data.message || 'Server error try again',
              buttonText: 'Ok',
            });
          }
        });
  };

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
          <Formik enableReinitialize initialValues={initialValues} onSubmit={handleSubmit}>
            {({
              values: {username},
              errors,
              touched,
              handleSubmit,
              handleChange,
              handleBlur,
              isSubmitting,
            }) => {
              return (
                <>
                  <ImageHandler
                      image={image || uri}
                      setImage={setImage}
                      label="Edytuj avatar"
                  />
                  <Input
                    value={username}
                    label="Nazwa użytkownika"
                    onChange={handleChange('username')}
                    // error={touched.eventname && (errors.eventname as string)}
                    onBlur={handleBlur('username')}
                  />
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={starsCount}
                    selectedStar={(rating: any) => onStarRatingPress(rating)}
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
