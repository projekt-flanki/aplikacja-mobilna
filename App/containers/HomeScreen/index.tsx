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
} from 'native-base';
import {NavigationStackProp} from 'react-navigation-stack';
import {View} from 'react-native';
import api from '../../utils/api';
import {UserInfoPayload} from '../../typings';
import {ApiResponse} from 'apisauce';
import {DrawerActions} from 'react-navigation-drawer';

type Props = {
  navigation: NavigationStackProp;
};

const uri = 'https://facebook.github.io/react-native/docs/assets/favicon.png';

const starUri =
  'https://cdn2.iconfinder.com/data/icons/modifiers-add-on-1-flat/48/Mod_Add-On_1-35-512.png';

export const HomeScreen = ({navigation}: Props) => {
  const [user, setUser] = useState<{
    username?: string;
    profileImageBase64?: string;
  }>({});
  useEffect(() => {
    api.getUserInfo().then(({data, ok}: ApiResponse<any>) => {
      if (ok) {
        setUser(data);
      } else {
        Toast.show({
          type: 'danger',
          //@ts-ignore
          text: 'You need to login to access this page',
          buttonText: 'Ok',
        });
        logout();
      }
    });
  }, []);

  const logout = () => {
    navigation.navigate('AuthStack');
    api.logout();
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
          <Title>Profil użytkownika</Title>
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
              <Text>Opinia: </Text>
              <Thumbnail small source={{uri: starUri}} />
              <Thumbnail small source={{uri: starUri}} />
              <Thumbnail small source={{uri: starUri}} />
              <Thumbnail small source={{uri: starUri}} />
              <Thumbnail small source={{uri: starUri}} />
            </View>
          </>
        )}
        <Button transparent
                onPress={() =>navigation.navigate('EditProfileStack')}
                  >
          <Text>Edytuj</Text></Button>
      </Content>
    </Container>
  );
};

HomeScreen.navigationOptions = {
  header: null,
};

export default HomeScreen;
