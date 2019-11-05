import React, {useState, useEffect} from 'react';
import {Root} from 'native-base';
import Login from '../LoginScreen';
import Register from '../RegisterScreen';
import HomeScreen from '../HomeScreen';
import MyEvents from '../MyEventsScreen';
import AddEvent from '../AddEventScreen';
import EditEvent from '../EditEventScreen';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import TempPage from '../TempPageScreen';

const AuthStack = createStackNavigator({Login});
const PrivateStack = createStackNavigator({HomeScreen});
const RegisterStack = createStackNavigator({Register});
// const DrawerOpen = createStackNavigator( {SideBar});
const MyEventsStack = createStackNavigator({MyEvents});
const TempStack = createStackNavigator({TempPage});
const AddEventStack = createStackNavigator({AddEvent});
const EditEventStack = createStackNavigator({EditEvent});

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
    'Twoje wydarzenia': {
      screen: MyEventsStack,
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
      MyEventsStack,
      AddEventStack,
      EditEventStack
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
