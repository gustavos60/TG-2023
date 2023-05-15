import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-native-paper';
import {ArtsProvider} from './context/arts';
import MainNavigator from './navigation/MainNavigator';
import {FavoritesProvider} from './context/favorites';

export default function App() {
  return (
    <NavigationContainer>
      <Provider>
        <ArtsProvider>
          <FavoritesProvider>
            <MainNavigator />
          </FavoritesProvider>
        </ArtsProvider>
      </Provider>
    </NavigationContainer>
  );
}
