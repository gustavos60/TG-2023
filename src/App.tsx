import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-native-paper';
import {ArtsProvider} from './context/arts';
import MainNavigator from './navigation/MainNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <Provider>
        <ArtsProvider>
          <MainNavigator />
        </ArtsProvider>
      </Provider>
    </NavigationContainer>
  );
}
