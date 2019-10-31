import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { Ionicons } from "@expo/vector-icons";
import { Root } from "native-base";
import Login from "./containers/Login";
import Register from "./containers/Register";
import HomeScreen from "./containers/HomeScreen";
import MyEvents from "./containers/MyEvents";
import AddEvent from "./containers/AddEvent";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SideBar from "./containers/Sidebar";
import { createDrawerNavigator } from "react-navigation-drawer";
import TempPage from "./containers/TempPage";

const AuthStack = createStackNavigator({ Login });
const PrivateStack = createStackNavigator({ HomeScreen });
const RegisterStack = createStackNavigator({ Register });
// const DrawerOpen = createStackNavigator( {SideBar});
const MyEventsStack = createStackNavigator({ MyEvents });
const TempStack = createStackNavigator({ TempPage });
const AddEventStack = createStackNavigator({ AddEvent });

const HomeScreenRouter = createDrawerNavigator(
  {
    Logowanie: {
      screen: AuthStack
    },
    Profil: {
      screen: PrivateStack
    },
    Ranking: {
      screen: TempStack
    },
    "Dodaj wydarzenie": {
      screen: AddEventStack
    },
    "Twoje wydarzenia": {
      screen: MyEventsStack
    }
  },
  {}
);

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      PrivateStack,
      AuthStack,
      RegisterStack,
      HomeScreenRouter,
      MyEventsStack,
      AddEventStack
    },
    {
      initialRouteName: "AuthStack"
    }
  )
);

export default function App() {
  const [ready, setReady] = useState(false);

  async function loadFonts() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
    setReady(true);
  }

  useEffect(() => {
    loadFonts();
  }, []);

  if (!ready) {
    return <AppLoading />;
  }

  return (
    <Root>
      <AppContainer />
    </Root>
  );
}
