import React, {useContext, useMemo} from 'react';
import type {StackScreenProps} from '@react-navigation/stack';

import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import {Text, Button, Snackbar} from 'react-native-paper';
import FastImage from 'react-native-fast-image';

import {RootStackParamList, Routes} from '../../navigation/MainNavigator';
import {ArtsContext} from '../../context/arts';
import {getImageUrl} from '../../api/arts';

import styles from './DetailsScreen.styles';
import useDetailsScreen from './useDetailsScreen';
import {DetailsLabels} from './DetailsConstants';

type Props = StackScreenProps<RootStackParamList, Routes.Details>;

const DetailsScreen = (props: Props) => {
  const {route, navigation} = props;

  const {art} = route.params || {};
  const {buttonLabel, closeSnackBar, onButtonPress, snackbarVisible} =
    useDetailsScreen(art);

  const {config} = useContext(ArtsContext);

  const imageUrl = useMemo(() => {
    if (!config?.iiif_url || !art?.image_id) {
      return undefined;
    }
    return getImageUrl(config.iiif_url, art.image_id);
  }, [art, config]);

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <Text variant="displaySmall">{DetailsLabels.header}</Text>
        <TouchableOpacity style={styles.headerBack} onPress={navigation.goBack}>
          <Text variant="labelMedium">{DetailsLabels.back}</Text>
        </TouchableOpacity>
      </View>
      <FastImage
        source={{uri: imageUrl}}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.informationContainer}>
        <View>
          <Text style={styles.informationLabel} variant="bodyLarge">
            {DetailsLabels.title}
          </Text>
          <Text variant="bodyMedium">{art.title}</Text>
        </View>
        <View>
          <Text style={styles.informationLabel} variant="bodyLarge">
            {DetailsLabels.artist}
          </Text>
          <Text variant="bodySmall">{art.artist_display}</Text>
        </View>
        <View>
          <Text style={styles.informationLabel} variant="bodyLarge">
            {DetailsLabels.date}
          </Text>
          <Text variant="bodySmall">{art.date_display}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button style={styles.button} mode="elevated" onPress={onButtonPress}>
          {buttonLabel}
        </Button>
      </View>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={closeSnackBar}
        duration={3000}
        action={{
          label: 'Close',
          onPress: closeSnackBar,
        }}>
        {DetailsLabels.done}
      </Snackbar>
    </SafeAreaView>
  );
};

export default DetailsScreen;
