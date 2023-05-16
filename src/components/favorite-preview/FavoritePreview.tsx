import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Surface} from 'react-native-paper';
import FastImage from 'react-native-fast-image';

import styles from './FavoritePreview.styles';
import {ArtItem} from '../../api/types';
import useImageUrl from '../../hooks/useImageUrl';

type Props = {
  art: ArtItem;
  onPress?: () => void;
};

export const FavoritePreview = (props: Props) => {
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
      </Surface>
    </TouchableOpacity>
  );
};
