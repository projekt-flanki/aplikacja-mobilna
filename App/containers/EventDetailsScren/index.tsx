import React, {useState,useEffect} from 'react';
import {NavigationStackProp} from 'react-navigation-stack';
import {
  Container,
  Header,
  Body,
  Title,
  Left,
  Content,
  Button,
  Icon,
  Text,
  View,
  Spinner,
  Toast,
} from 'native-base';
import {DrawerActions} from 'react-navigation-drawer';
import {ApiResponse} from 'apisauce';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import api from '../../utils/api';
import { EventDetailsPayload, EventUserDetails } from 'App/typings';
import dayjs from 'dayjs';
import { User } from '../../utils/User';

type Props = {
  navigation: NavigationStackProp;
};

export const EventDetailsScreens = ({ navigation }: Props) => {

  const [eventname, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [id, setId] = useState('');   
  const [positionData, setPositionData] = useState({
    latitude: 51.7833,
    longitude: 19.4667,
  });
  const [firstTeam, setFirstTeam] = useState<EventUserDetails[]>([])
  const [secondTeam, setSecondTeam] = useState<EventUserDetails[]>([])
  const [owner, setOwner] = useState<EventUserDetails>()
  
  const assignToEvent = (eventId: any) => () => {
        api.assignEvent({ eventId }).then(({ok, data}: ApiResponse<any>) => {
          if (ok) {
            Toast.show({
              type: 'success',
              text: 'Przypisałeś się do wydarzenia',
              buttonText: 'Ok',
            });
            setId('')
            fetchEventData(id)
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

  const quitEvent = (eventId: any) => () => {
        api.quitEvent({ eventId}).then(({ok, data}: ApiResponse<any>) => {
          if (ok) {
            Toast.show({
              type: 'success',
              text: 'Wypisałeś się z wydarzenia',
              buttonText: 'Ok', 
            });
            setId('')
            fetchEventData(id)
          } else {
            Toast.show({
              type: 'danger',
              //@ts-ignore
              text: data.message || 'Błąd podczas wypisywanie się z wydarzenia',
              buttonText: 'Ok',
            });
          }
        });
  };

  const fetchEventData = (id: string) => {
    api.getEventDetails(id).then(({data, ok}) => {
      if(ok) {
        const {
          id,
          firstTeam,
          secondTeam,
          longitude,
          latitude,
          date,
          description,
          name,
          owners,
        } = data as EventDetailsPayload
        setId(id)
        setDescription(description)
        setDate(date)
        setEventName(name)
        setPositionData({
          latitude,
          longitude
        })
        setFirstTeam(firstTeam)
        setSecondTeam(secondTeam)
        setOwner(owners[0])
      }
    })
  }

  useEffect(() => {
    if ( navigation.state.params !== undefined) {
      const id = navigation.state.params.eventObject;
      fetchEventData(id)
    }
  }, [navigation.state.params]);


  if(id === '') return <Spinner/>
  const inEvent = [...firstTeam, ...secondTeam].findIndex(({id}) => id ===User.userId) !== -1
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
          <Title>Detale wydarzenia</Title>
        </Body>
      </Header>
      <Content
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          padding: 20,
        }}>
          <Text style={{fontSize:20, margin: 10}}>{eventname}</Text>
          {owner && <Text style={{margin:10}}>Stworzony przez <Text style={{fontWeight: 'bold'}}>{owner.username}</Text></Text>}
          <Text  style={{margin:10}}>{description}</Text>
          <Text  style={{margin:10}}>{dayjs(date).format("HH:mm DD/MM/YYYY ")}</Text>
          <MapView
          style={{
            height: 100,
            width: '100%'
          }}
          showsUserLocation
          provider={PROVIDER_GOOGLE}
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
          <View style={{width: '100%', margin:10, display: 'flex', flexDirection: 'row'}}>
            <View style={{width:'50%', padding: 10, borderColor: 'blue', borderWidth: 1}}>
              <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>Druzyna niebieska</Text>
                {firstTeam.map(({username}) =>
                  <Text>- {username}</Text>
                )}
            </View>
            <View style={{width:'50%', padding: 10, borderColor: 'green', borderWidth: 1}}>
              <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>Druzyna zielona</Text>
              {secondTeam.map(({username}) =>
                <Text>- {username}</Text>
              )}
            </View>
          </View>
          <Button onPress={inEvent ? quitEvent(id) : assignToEvent(id)}>
            <Text>{inEvent ? "Wypisz sie z eventu" : "Zapisz sie do eventu"}</Text>
          </Button>
      </Content>
    </Container>
  );
};
EventDetailsScreens.navigationOptions = {
  header: null,
};

export default EventDetailsScreens;
