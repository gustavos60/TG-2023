import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-native-paper';
import MainNavigator from './navigation/MainNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <Provider>
        <MainNavigator />
      </Provider>
    </NavigationContainer>
  );
}
