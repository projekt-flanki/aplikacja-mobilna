import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Title,
  Text,
} from 'native-base';
import {DrawerActions} from 'react-navigation-drawer';
import {NavigationStackProp} from 'react-navigation-stack';

type Props = {
  navigation: NavigationStackProp;
};

const TempPage = ({navigation}: Props) => {
  const [positionData, setPositionData] = useState({
    latitude: 51.7833,
    longitude: 19.4667,
  });
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
          <Title>In progress</Title>
        </Body>
      </Header>
      <Content
        contentContainerStyle={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <MapView
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          showsUserLocation
          provider={PROVIDER_GOOGLE}
          onRegionChange={({longitude, latitude}) => {
            setPositionData({
              longitude,
              latitude,
            });
          }}
          initialRegion={{
            latitude: positionData.latitude,
            longitude: positionData.longitude,
            latitudeDelta: 0.0022,
            longitudeDelta: 0.0021,
          }}>
          <Marker
            coordinate={{
              latitude: positionData.latitude,
              longitude: positionData.longitude,
            }}
            title={'test'}
            description={'test'}
          />
        </MapView>
        <Button
          dark
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
          }}>
          <Text>Accept</Text>
        </Button>
      </Content>
    </Container>
  );
};
export default TempPage;

TempPage.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
