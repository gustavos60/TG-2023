import React, {useContext, useMemo} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Surface, Text} from 'react-native-paper';
import FastImage from 'react-native-fast-image';

import styles from './ArtPreview.styles';
import {ArtItem} from '../../api/types';
import {ArtsContext} from '../../context/arts';
import {getImageUrl} from '../../api/arts';

type Props = {
  art: ArtItem;
};

export const ArtPreview = (props: Props) => {
  const {art} = props;

  const {config} = useContext(ArtsContext);

  const imageUrl = useMemo(() => {
    if (!config?.iiif_url || !art?.image_id) {
      return undefined;
    }
    return getImageUrl(config.iiif_url, art.image_id);
  }, [art, config]);

  return (
    <TouchableOpacity style={styles.touchable} testID={String(art.id)}>
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
