import React, {useCallback, useEffect} from 'react';
import {SafeAreaView, FlatList, ListRenderItem} from 'react-native';

import useHome from './useHome';
import styles from './HomeScreen.styles';
import {ArtPreview} from '../../components/art-preview/ArtPreview';
import {ArtItem} from '../../api/types';

const HomeScreen = () => {
  const {fetchNextPage, arts, page} = useHome();

  useEffect(() => {
    fetchNextPage(1);
  }, []);

  const renderArt: ListRenderItem<ArtItem> = useCallback(
    item => <ArtPreview art={item?.item} key={item?.item?.id} />,
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={arts}
        renderItem={renderArt}
        onEndReached={() => fetchNextPage(page)}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
