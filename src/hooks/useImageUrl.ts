import {useContext, useMemo} from 'react';
import {ArtItem} from '../api/types';
import {ArtsContext} from '../context/arts';
import {getImageUrl} from '../api/arts';

const useImageUrl = (art: ArtItem) => {
  const {config} = useContext(ArtsContext);

  const imageUrl = useMemo(() => {
    if (!config?.iiif_url || !art?.image_id) {
      return undefined;
    }
    return getImageUrl(config.iiif_url, art.image_id);
  }, [art, config]);

  return imageUrl;
};

export default useImageUrl;
