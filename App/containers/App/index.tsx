import React, {useState, useEffect} from 'react';
import {Root} from 'native-base';
import Login from '../LoginScreen';
import Register from '../RegisterScreen';
import HomeScreen from '../HomeScreen';
import AllEvents from '../AllEventsScreen';
import AddEvent from '../AddEventScreen';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import TempPage from '../TempPageScreen';
import EditProfile from '../EditProfileScreen';
import UserEvents from '../UserEventsScreen';

const AuthStack = createStackNavigator({Login});
const PrivateStack = createStackNavigator({HomeScreen});
const RegisterStack = createStackNavigator({Register});
// const DrawerOpen = createStackNavigator( {SideBar});
const AllEventsStack = createStackNavigator({AllEvents});
const TempStack = createStackNavigator({TempPage});
const AddEventStack = createStackNavigator({AddEvent});
const EditProfileStack = createStackNavigator({EditProfile});
const UserEventsStack = createStackNavigator({UserEvents});

const HomeScreenRouter = createDrawerNavigator(
  {
    Profil: {
      screen: PrivateStack,
    },
    Ranking: {
      screen: TempStack,
    },
    'Dodaj wydarzenie': {
      screen: AddEventStack,
    },
    'Wszystkie wydarzenia': {
      screen: AllEventsStack,
    },
    'Twoje wydarzenia': {
      screen: UserEventsStack,
    },
    Wyloguj: {
      screen: AuthStack,
    },
  },
  {},
);

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      PrivateStack,
      AuthStack,
      RegisterStack,
      HomeScreenRouter,
      AllEventsStack,
      AddEventStack,
      EditProfileStack,
    },
    {
      initialRouteName: 'AuthStack',
    },
  ),
);

export default function App() {
  return (
    <Root>
      <AppContainer />
    </Root>
  );
}
