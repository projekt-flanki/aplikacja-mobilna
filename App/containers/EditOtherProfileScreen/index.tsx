import React, {useEffect, useState} from 'react';
import {
  Container,
  Content,
  Text,
  Header,
  Body,
  Button,
  Title,
  Thumbnail,
  Spinner,
  Icon,
  Left,
  Toast,
  List,
  ListItem,
} from 'native-base';
import {NavigationStackProp} from 'react-navigation-stack';
import {View} from 'react-native';
import api from '../../utils/api';
import {UserInfoPayload} from '../../typings';
import {ApiResponse} from 'apisauce';
import {DrawerActions} from 'react-navigation-drawer';
import * as events from 'events';
import StarRating from 'react-native-star-rating';

type Props = {
  navigation: NavigationStackProp;
}

const uri = 'https://facebook.github.io/react-native/docs/assets/favicon.png';


export const EditOtherProfileScreen = ({navigation}: Props) => {

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

  const [user, setUser] = useState<{
    username?: string;
    profileImageBase64?: string;
    rating?: number;
  }>({});


  const starListArray = [];


    useEffect(() => {
        api.getUserByUuid(navigation.getParam('uuid', 'NO-ID')).then(({data, ok}: ApiResponse<any>) => {
            if (ok) {
                const {username, profileImageBase64, rating, email} = data as UserInfoPayload;
                console.log(username);
                setUserName(username);
                setImage(profileImageBase64);
                setStarCount(rating);
                setEmail(email);
                setUser(user);
            } else {
                Toast.show({
                    type: 'danger',
                    //@ts-ignore
                    text: 'Nie można pobrać użytkownika',
                    buttonText: 'Ok',
                });
            }
        });
    }, []);

    const handleSubmit = ({rating}: typeof initialValues): void => {
        api
            .editUser({
                email: email, username: userName, profileImageBase64: image, rating: rating
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
          <Title>Profil użytkownika {user.username}</Title>
        </Body>
      </Header>
      <Content
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          padding: 20,
        }}>
        {!user.username && <Spinner />}
        {user.username && (
          <>
            <Thumbnail large source={{uri: user.profileImageBase64 || uri}} />
            <Text style={{marginTop: 10}}>{user.username}</Text>
            <Text style={{marginTop: 10}}>Punkty: 1234</Text>
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={starsCount}
                    selectedStar={(rating: any) => onStarRatingPress(rating)}
                />
                <Button onPress={handleSubmit(starsCount)} full style={{marginTop: 10}}>
                    <Text>Zapisz</Text>
                </Button>
            </View>
          </>
        )}

    </Content>
    </Container>
  );
};

EditOtherProfileScreen.navigationOptions = {
  header: null,
};

export default EditOtherProfileScreen;
