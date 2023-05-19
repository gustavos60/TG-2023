import React, {useMemo} from 'react';
import {TouchableOpacity} from 'react-native';
import {Surface} from 'react-native-paper';
import FastImage from 'react-native-fast-image';

import styles from './FavoritePreview.styles';
import {ArtItem} from '../../api/types';
import useImageUrl from '../../hooks/useImageUrl';
import {testProps} from '../../utils/testProps';

type Props = {
  art: ArtItem;
  onPress?: () => void;
};

export const FavoritePreview = (props: Props) => {
  const {art, onPress} = props;

  const imageUrl = useImageUrl(art);

  const testId = useMemo(() => `Fav-${art.id}`, [art?.id]);

  return (
    <TouchableOpacity
      style={styles.touchable}
      {...testProps(testId)}
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
