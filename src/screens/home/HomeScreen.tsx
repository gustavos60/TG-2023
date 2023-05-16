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
import {RootStackParamList, Routes} from '../../navigation/MainNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {FavoritePreview} from '../../components/favorite-preview/FavoritePreview';

type Props = StackScreenProps<RootStackParamList, Routes.Home>;

const HomeScreen = (props: Props) => {
  const {fetchNextPage, arts, page, favorites, loading} = useHomeScreen();

  const {navigation} = props;

  useEffect(() => {
    fetchNextPage(1);
  }, []);

  const renderArt: ListRenderItem<ArtItem> = useCallback(
    item => (
      <ArtPreview
        art={item?.item}
        key={item?.item?.id}
        onPress={() => navigation.navigate(Routes.Details, {art: item.item})}
      />
    ),
    [],
  );

  const renderFavorite: ListRenderItem<ArtItem> = useCallback(
    item => (
      <FavoritePreview
        art={item?.item}
        key={item?.item?.id}
        onPress={() => navigation.navigate(Routes.Details, {art: item.item})}
      />
    ),
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
        renderItem={renderFavorite}
        horizontal
        alwaysBounceVertical={false}
        contentContainerStyle={styles.favoritesContainer}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
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
