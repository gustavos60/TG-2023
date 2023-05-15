import React, {useCallback, useEffect, useMemo} from 'react';
import {SafeAreaView, FlatList, ListRenderItem, View} from 'react-native';

import useHomeScreen from './useHomeScreen';
import styles from './HomeScreen.styles';
import {ArtPreview} from '../../components/art-preview/ArtPreview';
import {ArtItem} from '../../api/types';
import {ActivityIndicator, Text} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {testProps} from '../../utils/testProps';
import {HomeLabels, HomeTestIds} from './HomeConstants';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const {fetchNextPage, arts, page, favorites, loading} = useHomeScreen();

  const navigation = useNavigation();

  useEffect(() => {
    fetchNextPage(1);
  }, []);

  const renderArt: ListRenderItem<ArtItem> = useCallback(
    item => <ArtPreview art={item?.item} key={item?.item?.id} />,
    [],
  );

  const ArtsFooterComponent = useMemo(() => {
    return loading ? <ActivityIndicator /> : null;
  }, [loading]);

  const EmptyFavoritesComponent = useMemo(
    () => (
      <Text
        style={styles.emptyFavoritesLabel}
        variant="labelMedium"
        {...testProps(HomeTestIds.noFavoritesLabel)}>
        {HomeLabels.noFavoritesLabel}
      </Text>
    ),
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text
          {...testProps(HomeTestIds.headerText)}
          style={styles.headerLabel}
          variant="displaySmall">
          {HomeLabels.headerText}
        </Text>
        <TouchableOpacity
          onPress={navigation.goBack}
          {...testProps(HomeTestIds.signOut)}>
          <Text variant="labelMedium">{HomeLabels.signOut}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.headline} variant="headlineSmall">
        {HomeLabels.favoritesLabel}
      </Text>
      <FlatList
        data={favorites}
        renderItem={renderArt}
        ListEmptyComponent={EmptyFavoritesComponent}
      />
      <Text style={styles.headline} variant="headlineSmall">
        {HomeLabels.allLabel}
      </Text>
      <FlatList
        data={arts}
        renderItem={renderArt}
        showsVerticalScrollIndicator={false}
        onEndReached={() => fetchNextPage(page)}
        ListFooterComponent={ArtsFooterComponent}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
