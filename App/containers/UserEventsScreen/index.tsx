import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  List,
  ListItem,
  Right,
  Title,
} from 'native-base';
import {DrawerActions} from 'react-navigation-drawer';
import api from '../../utils/api';
import {NavigationStackProp} from 'react-navigation-stack';
import dayjs from 'dayjs';
import {ApiResponse} from 'apisauce';
import navigateWithParams from '../../utils/navigateWithParams';

type Props = {
  navigation: NavigationStackProp;
};
const UserEvents = ({ navigation }: Props) => {
  const goToEvents = (data: object) => () => {
    navigateWithParams(navigation, 'ManageEventsStack', 'ManageEvents', {eventObject: data});
  }

  const [events, setMyEvents] = useState([]);

  useEffect(() => {
    api.getMyEvents().then(({data, ok}: ApiResponse<any>) => {
      setMyEvents(data);
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
          <Title>Twoje wydarzenia</Title>
        </Body>
      </Header>
      <Content>
        {events.length > 0 && (
          <List
            dataArray={events}
            renderRow={data => {
              return (
                <ListItem
                  key={data.id}
                  // button
                  // onPress={() => navigation.navigate(data.route)}
                >
                  <Left>
                  <Text>{dayjs(data.date).format('DD MM YYYY')}</Text>
                  <Text style={{fontWeight: 'bold', marginLeft: 5}}>
                    {data.name}
                  </Text>
                  <Text style={{ marginLeft: 5 }}>{data.location}</Text>
                  </Left>
                  <Right>
                    <Button style={{ backgroundColor: "white"}} onPress={goToEvents(data)}>
                      <Icon active name="settings" style={{ fontSize: 20, color: 'gray' }} />
                      <Text>Edytuj</Text>
              </Button>
              </Right>
                </ListItem>
              );
            }}
          />
        )}
      </Content>
    </Container>
  );
};
export default UserEvents;

UserEvents.navigationOptions = {
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
