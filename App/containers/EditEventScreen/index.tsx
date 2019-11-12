import React, {useEffect, useState} from 'react';
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
import {Formik} from 'formik';
import { NavigationStackProp } from 'react-navigation-stack';
import api from '../../utils/api';
import Input from '../../components/input';
import * as Yup from 'yup';

import {DrawerActions} from 'react-navigation-drawer';
import {ApiResponse} from 'apisauce'

type Props = {
    navigation: NavigationStackProp;
};

const initialValues = {
    id:'18ab2ff4-3006-4d8f-bcac-fe1c456e3ab1',
    eventname: '',
    location: '',
    date: '',
    description: '',
    hours: '',
};
const validationSchema = Yup.object().shape({
    eventname: Yup.string().required('Uzupełnij nazwę wydarzenia'),
    location: Yup.string().required('Uzupełnij lokalizacje'),
    // date: Yup.string().required("Uzupełnij datę")
  });
export const EditEvent = ({ navigation }: Props) => {
    const handleSubmit = () => { };
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
                        justifyContent: 'center',
                        flex: 1,
                        padding: 20,
                    }}>
                    <Form>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                            validationSchema={validationSchema}>
                            {({
                                values: { eventname, description, location, date },
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
                                            value={eventname}
                                            label="Nazwa wydarzenia"
                                            onChange={handleChange('eventname')}
                                            error={touched.eventname && (errors.eventname as string)}
                                            onBlur={handleBlur('eventname')}
                                        />
                                        <Input
                                            value={location}
                                            label="Lokalizacja wydarzenia"
                                            onChange={handleChange('location')}
                                            error={touched.location && (errors.location as string)}
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
                                            textStyle={{ color: '#040404' }}
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
                                        <Button onPress={handleSubmit} full style={{ marginTop: 10 }}>
                                            <Text>Utwórz wydarzenie</Text>
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
export default EditEvent;