import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  HomeScreen,
  SearchScreen,
  SignInScreen,
  DetailsScreen,
} from '../screens';
import {ArtItem} from '../api/types';

export enum Routes {
  Home = 'Home',
  Search = 'Search',
  SignIn = 'SignIn',
  Details = 'Details',
}

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  SignIn: undefined;
  Details: {art: ArtItem};
};

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.SignIn}
      screenOptions={{header: () => null}}>
      <Stack.Screen name={Routes.SignIn} component={SignInScreen} />
      <Stack.Screen name={Routes.Home} component={HomeScreen} />
      <Stack.Screen name={Routes.Search} component={SearchScreen} />
      <Stack.Screen name={Routes.Details} component={DetailsScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
