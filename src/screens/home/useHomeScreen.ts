import {useContext} from 'react';
import useArtsPagination from '../../hooks/useArtsPagination';
import {ArtsContext} from '../../context/arts';
import {FavoritesContext} from '../../context/favorites';

const useHome = () => {
  const {arts, page} = useContext(ArtsContext);
  const {favorites} = useContext(FavoritesContext);
  const {error, fetchNextPage, loading, resetList} = useArtsPagination();

  return {arts, error, fetchNextPage, loading, resetList, page, favorites};
};

export default useHome;
