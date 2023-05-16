import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Surface, Text} from 'react-native-paper';
import FastImage from 'react-native-fast-image';

import styles from './ArtPreview.styles';
import {ArtItem} from '../../api/types';
import useImageUrl from '../../hooks/useImageUrl';

type Props = {
  art: ArtItem;
  onPress?: () => void;
};

export const ArtPreview = (props: Props) => {
  const {art, onPress} = props;

  const imageUrl = useImageUrl(art);

  return (
    <TouchableOpacity
      style={styles.touchable}
      testID={String(art.id)}
      onPress={onPress}>
      <Surface style={styles.container}>
        <FastImage
          resizeMode="cover"
          style={styles.image}
          source={{uri: imageUrl}}
        />
        <View style={styles.textContainer}>
          <Text numberOfLines={2} variant="titleMedium" style={styles.title}>
            {art.title}
          </Text>
          <Text numberOfLines={1} style={styles.author}>
            {art.date_display}
          </Text>
          <Text numberOfLines={1} style={styles.author}>
            by {art.artist_display}
          </Text>
        </View>
      </Surface>
    </TouchableOpacity>
  );
};
