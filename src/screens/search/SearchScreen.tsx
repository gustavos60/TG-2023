import React, {useCallback, useMemo} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';

import styles from './SearchScreen.styles';
import {Input} from '../../components';
import useSearchScreen from './useSearchScreen';
import {ArtItem} from '../../api/types';
import {ArtPreview} from '../../components/art-preview/ArtPreview';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList, Routes} from '../../navigation/MainNavigator';
import {SearchLabels, SearchTestIds} from './SearchConstants';
import {testProps} from '../../utils/testProps';

type Props = StackScreenProps<RootStackParamList, Routes.Search>;

const SearchScreen = (props: Props) => {
  const {arts, query, loading, setQuery} = useSearchScreen();
  const {navigation} = props;

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

  const ArtsFooterComponent = useMemo(() => {
    return loading ? <ActivityIndicator /> : null;
  }, [loading]);

  const ArtsEmptyComponent = useMemo(
    () => (
      <Text style={styles.emptyLabel} variant="labelMedium">
        {SearchLabels.emptyLabel}
      </Text>
    ),
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text variant="displaySmall">{SearchLabels.header}</Text>
        <TouchableOpacity
          {...testProps(SearchTestIds.goBack)}
          style={styles.headerBack}
          onPress={navigation.goBack}>
          <Text variant="labelMedium">{SearchLabels.goBack}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Input
          placeholder={SearchLabels.inputPlaceholder}
          label={SearchLabels.inputLabel}
          style={styles.input}
          onChangeText={setQuery}
          value={query}
          maxLength={30}
          {...testProps(SearchTestIds.input)}
        />
        <Text variant="headlineSmall">{SearchLabels.arts}</Text>
        <FlatList
          data={arts}
          renderItem={renderArt}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={ArtsFooterComponent}
          ListEmptyComponent={ArtsEmptyComponent}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
