import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen, ProfileScreen, SignInScreen} from '../screens';

export enum Routes {
  Home = 'Home',
  Profile = 'Profile',
  SignIn = 'SignIn',
}

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  SignIn: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{header: () => null}}>
      <Stack.Screen name={Routes.SignIn} component={SignInScreen} />
      <Stack.Screen name={Routes.Home} component={HomeScreen} />
      <Stack.Screen name={Routes.Profile} component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
