import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { Root } from "native-base";
import Login from './containers/Login'
import HomeScreen from './containers/HomeScreen'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AuthStack = createStackNavigator({ Login });
const PrivateStack = createStackNavigator({ HomeScreen });

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      PrivateStack,
      AuthStack,
    },
    {
      initialRouteName: 'AuthStack',
    }
  ));

export default function App() {

  const [ready, setReady] = useState(false)

  async function loadFonts() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    setReady(true)
  }

  useEffect(() => { loadFonts() }, []);

  if (!ready) {
    return <AppLoading />
  }

  return (
    <Root>
      <AppContainer />
    </Root>
  );
}

