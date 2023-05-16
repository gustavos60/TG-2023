import {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {ArtItem} from '../../api/types';
import {FavoritesContext} from '../../context/favorites';
import {DetailsLabels} from './DetailsConstants';

const useDetailsScreen = (art: ArtItem) => {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [buttonLabel, setButtonLabel] = useState(DetailsLabels.add);

  const {favorites, addFavorite, removeFavorite} = useContext(FavoritesContext);

  const isFavorite = useMemo(() => {
    const found = favorites.find(item => item.id === art.id);
    return !!found;
  }, [art, favorites]);

  useEffect(() => {
    const newLabel = isFavorite ? DetailsLabels.remove : DetailsLabels.add;
    setButtonLabel(newLabel);
  }, [isFavorite]);

  const onButtonPress = useCallback(() => {
    if (isFavorite) {
      removeFavorite(art);
      setSnackbarVisible(true);
    } else {
      addFavorite(art);
      setSnackbarVisible(true);
    }
  }, [isFavorite, art]);

  const closeSnackBar = useCallback(() => {
    setSnackbarVisible(false);
  }, []);

  return {snackbarVisible, buttonLabel, onButtonPress, closeSnackBar};
};

export default useDetailsScreen;
