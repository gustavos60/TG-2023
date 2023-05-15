import React, {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useState,
  useMemo,
} from 'react';
import {ArtItem} from '../api/types';

type FavoritesContextType = {
  favorites: ArtItem[];
  addFavorite: (item: ArtItem) => boolean;
  removeFavorite: (item: ArtItem) => boolean;
};

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => false,
  removeFavorite: () => false,
});

export const FavoritesProvider: FC<{children: ReactNode}> = ({children}) => {
  const [favorites, setFavorites] = useState<ArtItem[]>([]);

  const addFavorite = useCallback(
    (item: ArtItem) => {
      const alreadySaved = favorites.find(({id}) => id === item.id);
      if (!alreadySaved) {
        const newFavorites = favorites.concat(item);
        setFavorites(newFavorites);
      }
      return !alreadySaved;
    },
    [favorites],
  );

  const removeFavorite = useCallback(
    (item: ArtItem) => {
      const newFavorites = favorites.filter(({id}) => item.id !== id);
      const wasRemoved = newFavorites.length !== favorites.length;
      if (wasRemoved) {
        setFavorites(newFavorites);
      }
      return wasRemoved;
    },
    [favorites],
  );

  const value = useMemo(
    () => ({favorites, addFavorite, removeFavorite}),
    [favorites, addFavorite, removeFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
