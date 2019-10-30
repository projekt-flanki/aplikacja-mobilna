import React from 'react';
import {Root} from 'native-base';
import Login from '../LoginScreen';
import Register from '../RegisterScreen';
import HomeScreen from '../HomeScreen';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const AuthStack = createStackNavigator({Login});
const PrivateStack = createStackNavigator({HomeScreen});
const RegisterStack = createStackNavigator({Register});

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      PrivateStack,
      AuthStack,
      RegisterStack,
    },
    {
      initialRouteName: 'AuthStack',
    },
  ),
);

export default function App() {
  // const [ready, setReady] = useState(false);

  // async function loadFonts() {
  //   await Font.loadAsync({
  //     Roboto: require("native-base/Fonts/Roboto.ttf"),
  //     Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
  //     ...Ionicons.font
  //   });
  //   setReady(true);
  // }

  // useEffect(() => {
  //   loadFonts();
  // }, []);

  // if (!ready) {
  //   return <AppLoading />;
  // }

  return (
    <Root>
      <AppContainer />
    </Root>
  );
}
