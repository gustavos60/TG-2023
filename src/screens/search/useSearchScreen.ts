import {useCallback, useContext, useEffect, useState} from 'react';
import debounce from 'lodash.debounce';

import {ArtItem} from '../../api/types';
import {searchArts} from '../../api/arts';
import {ArtsContext} from '../../context/arts';

const useSearchScreen = () => {
  const [arts, setArts] = useState<ArtItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const {setConfig} = useContext(ArtsContext);

  const queryArts = useCallback(
    debounce(async (text: string) => {
      if (!text) {
        setArts([]);
        return;
      }
      try {
        setLoading(true);
        const response = await searchArts(text);
        setArts(response.data);
        setConfig(response.config);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 500),
    [],
  );

  useEffect(() => {
    queryArts(query);
  }, [query]);

  return {arts, loading, query, setQuery};
};

export default useSearchScreen;
