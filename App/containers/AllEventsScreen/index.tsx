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
import { AssignEventPayload } from 'App/typings';

type Props = {
  navigation: NavigationStackProp;
};
const AllEvents = ({navigation}: Props) => {
  const assignToEvent = (data: object) => () => {
    const { id } = data;
        api.assignEvent({ eventId:id }).then(({ok, data}: ApiResponse<any>) => {
          if (ok) {
            Toast.show({
              type: 'success',
              text: 'Przypisałeś się do wydarzenia',
              buttonText: 'Ok', 
            });
            navigation.navigate('PrivateStack');
          } else {
            Toast.show({
              type: 'danger',
              //@ts-ignore
              text: data.message || 'Błąd podczas przypisywania się do wydarzenia',
              buttonText: 'Ok',
            });
          }
        });
  };
  const [events, setMyEvents] = useState([]);

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
                  // button
                  // onPress={() => navigation.navigate(data.route)}
                >
                  <Left>
                    <Text>{dayjs(data.date).format('DD MM YYYY')}</Text>
                    <Text style={{fontWeight: 'bold', marginLeft: 5}}>
                      {data.name}
                    </Text>
                    <Text style={{marginLeft: 5}}>{data.location}</Text>
                  </Left>
                  <Right>
                    <Button 
                      style={{backgroundColor: 'white'}}
                      onPress={assignToEvent(data)}>
                      <Icon
                        active 
                        name="md-checkbox-outline"
                      
                        style={{fontSize: 20, color: 'gray'}}
                      />
                      <Text>Dołącz</Text>
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
export default AllEvents;

AllEvents.navigationOptions = {
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
