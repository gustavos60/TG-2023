import React, {useContext, useMemo} from 'react';
import {TouchableOpacity} from 'react-native';
import {Surface} from 'react-native-paper';
import FastImage from 'react-native-fast-image';

import styles from './FavoritePreview.styles';
import {ArtItem} from '../../api/types';
import {ArtsContext} from '../../context/arts';
import {getImageUrl} from '../../api/arts';

type Props = {
  art: ArtItem;
  onPress?: () => void;
};

export const FavoritePreview = (props: Props) => {
  const {art, onPress} = props;

  const {config} = useContext(ArtsContext);

  const imageUrl = useMemo(() => {
    if (!config?.iiif_url || !art?.image_id) {
      return undefined;
    }
    return getImageUrl(config.iiif_url, art.image_id);
  }, [art, config]);

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
