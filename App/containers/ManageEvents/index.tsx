import React, {useState} from 'react';
import {NavigationStackProp} from 'react-navigation-stack';
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
  Text,
  View,
} from 'native-base';
import Input from '../../components/input';
import api from '../../utils/api';
import * as Yup from 'yup';
import {Formik, FormikBag} from 'formik';
import {DrawerActions} from 'react-navigation-drawer';
import {ApiResponse} from 'apisauce';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

type Props = {
  navigation: NavigationStackProp;
};
const initialValues = {
  eventname: '',
  date: '',
  location: '',
  description: '',
  hours: '',
};
const validationSchema = Yup.object().shape({
  eventname: Yup.string().required('Uzupełnij nazwę wydarzenia'),
  // date: Yup.string().required("Uzupełnij datę")
});

export const ManageEvents = ({navigation}: Props) => {
  const [wasMapOpened, setMapOpened] = useState(false);
  const [positionData, setPositionData] = useState({
    latitude: 51.7833,
    longitude: 19.4667,
  });
  const [showMap, setShowMap] = useState(false);
  const handleSubmit = (
    {eventname, date, description}: typeof initialValues,
    {setFieldError}: any,
  ) => {
    if (!wasMapOpened) {
      setFieldError('location', 'Wybierz lokacje');
    }
    api
      .addEvent({
        name: eventname,
        latitude: positionData.latitude,
        longitude: positionData.longitude,
        date: date,
        description: description,
      })
      .then(({ok, data}: ApiResponse<any>) => {
        if (ok) {
          Toast.show({
            type: 'success',
            text: 'Utworzono wydarzenie',
            buttonText: 'Ok', 
          });
          navigation.navigate('PrivateStack');
        } else {
          Toast.show({
            type: 'danger',
            //@ts-ignore
            text: data.message || 'Nie udało się utworzyć wydarzenia',
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
          <Title>Stwórz wydarzenie</Title>
        </Body>
      </Header>
      <Content
        contentContainerStyle={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <MapView
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            ...(!showMap && { opacity: 0, zIndex: -1}),
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
          onPress={() => setShowMap(false)}
          dark
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            ...(!showMap && {height: 0, width: 0, opacity: 0}),
          }}>
          <Text>Accept</Text>
        </Button>
        <Form>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}>
            {({
              values: {eventname, description, date},
              errors,
              touched,
              handleSubmit,
              handleChange,
              handleBlur,
            }) => {
              console.log(
                'opened',
                wasMapOpened && (errors.location as string),
              );
              return (
                <View style={showMap ? {height: 0, width: 0, opacity: 0} : {}}>
                  <Input
                    value={eventname}
                    label="Nazwa wydarzenia"
                    onChange={handleChange('eventname')}
                    error={touched.eventname && (errors.eventname as string)}
                    onBlur={handleBlur('eventname')}
                  />
                  <Input
                    onClick={() => {
                      setMapOpened(true);
                      setShowMap(true);
                    }}
                    disabled
                    value={
                      !wasMapOpened
                        ? ''
                        : `${positionData.latitude.toFixed(
                            4,
                          )} ${positionData.longitude.toFixed(4)}`
                    }
                    label="Lokalizacja wydarzenia"
                    onChange={handleChange('location')}
                    error={!wasMapOpened && (errors.location as string)}
                    onBlur={handleBlur('location')}
                  />
                  <Input
                    value={description}
                    label="Opis wydarzenia"
                    onChange={handleChange('description')}
                    error={
                      touched.description && (errors.description as string)
                    }
                    onBlur={handleBlur('description')}
                  />
                  <Icon name="calendar" />
                  <Text> Wybierz datę</Text>
                  <DatePicker
                    defaultDate={new Date()}
                    minimumDate={new Date()}
                    maximumDate={new Date(2021, 12, 31)}
                    locale={'pl'}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={'fade'}
                    androidMode={'spinner'}
                    placeHolderText={date.length > 0 ? date : '  /  /  '}
                    textStyle={{color: '#040404'}}
                    placeHolderTextStyle={{
                      color: '#EFF0F3',
                      borderBottomColor: '#B4BEC5',
                      backgroundColor: '#B4BEC5',
                    }}
                    onDateChange={handleChange('date')}
                    disabled={false}
                  />
                  {/* <Icon name="paperclip" />
                  <Text> Wybierz zdjęcie do wydarzenia</Text>
                  <Thumbnail small source={{ uri }} /> */}
                  <Button onPress={handleSubmit} full style={{marginTop: 10}}>
                    <Text>Utwórz wydarzenie</Text>
                  </Button>
                </View>
              );
            }}
          </Formik>
        </Form>
      </Content>
    </Container>
  );
};
ManageEvents.navigationOptions = {
  header: null,
};

export default ManageEvents;
