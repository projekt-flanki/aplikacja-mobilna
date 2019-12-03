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
  Toast,
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
const AllEvents = ({navigation}: Props) => {
  const [events, setMyEvents] = useState([]);
  const navigateToDetails = ({id}: any) => () => {
    navigateWithParams(navigation, 'EventDetailsStack', 'EventDetails', {eventObject: id});

  }

  useEffect(() => {
    api.getAllEvents().then(({data, ok}: ApiResponse<any>) => {
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
          <Title>Wszystkie wydarzenia</Title>
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
                  onPress={navigateToDetails(data)}
                >
                  <Left>
                    <Text>{dayjs(data.date).format('DD MM YYYY')}</Text>
                    <Text style={{fontWeight: 'bold', marginLeft: 5}}>
                      {data.name}
                    </Text>
                    <Text style={{marginLeft: 5}}>{data.location}</Text>
                  </Left>
                </ListItem>
              );
            }}
          />
        )}
      </Content>
    </Container>
  );
};
export default AllEvents;

AllEvents.navigationOptions = {
  header: null,
};

