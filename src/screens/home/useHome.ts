import {useContext} from 'react';
import useArtsPagination from '../../hooks/useArtsPagination';
import {ArtsContext} from '../../context/arts';

const useHome = () => {
  const {arts, page} = useContext(ArtsContext);
  const {error, fetchNextPage, loading, resetList} = useArtsPagination();

  return {arts, error, fetchNextPage, loading, resetList, page};
};

export default useHome;
