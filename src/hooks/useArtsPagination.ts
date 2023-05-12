import {useCallback, useContext, useState} from 'react';
import {fetchArts} from '../api/arts';
import {ArtsContext} from '../context/arts';
import {ArtItem} from '../api/types';

const useArtsPagination = () => {
  const {setPage, setArts, setConfig} = useContext(ArtsContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const appendWithoutDuplicates = useCallback(
    (oldArts: ArtItem[], newArts: ArtItem[]) => {
      const uniqueNewArts = newArts.filter(newArt => {
        const isDuplicated = oldArts.find(oldArt => oldArt.id === newArt.id);
        return !isDuplicated;
      });

      return [...oldArts, ...uniqueNewArts];
    },
    [],
  );

  const fetchNextPage = useCallback(async (page: number) => {
    try {
      setLoading(true);
      const responseData = await fetchArts(page);
      setConfig(responseData.config);
      setArts(arts => appendWithoutDuplicates(arts, responseData.data));
      setPage(page + 1);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const resetList = useCallback(async () => {
    setPage(1);
    setArts([]);
    fetchNextPage(1);
  }, []);

  return {resetList, fetchNextPage, error, loading};
};

export default useArtsPagination;
