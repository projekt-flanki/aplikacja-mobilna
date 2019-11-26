import React, {useState, useEffect} from 'react';
import {Root} from 'native-base';
import Login from '../LoginScreen';
import Register from '../RegisterScreen';
import HomeScreen from '../HomeScreen';
import MyEvents from '../AllEventsScreen';
import ManageEvents from '../ManageEvents';

import AllEvents from '../AllEventsScreen';
// import AddEvent from '../AddEventScreen';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import RankingPage from '../RankingScreen';
import EditProfile from '../EditProfileScreen';
import UserEvents from '../UserEventsScreen';

const AuthStack = createStackNavigator({Login});
const PrivateStack = createStackNavigator({HomeScreen});
const RegisterStack = createStackNavigator({Register});
// const DrawerOpen = createStackNavigator( {SideBar});
const AllEventsStack = createStackNavigator({AllEvents});
const RankingStack = createStackNavigator({RankingPage});
const EditProfileStack = createStackNavigator({EditProfile});
const UserEventsStack = createStackNavigator({UserEvents});
const ManageEventsStack = createStackNavigator({ManageEvents});
const MyEventsStack = createStackNavigator({ MyEvents });


const HomeScreenRouter = createDrawerNavigator(
  {
    Profil: {
      screen: PrivateStack,
    },
    Ranking: {
      screen: RankingStack,
    },
    'Dodaj wydarzenie': {
      screen: ManageEventsStack,
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
      EditProfileStack,
      MyEventsStack,
      ManageEventsStack,
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
