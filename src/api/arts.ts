import {ArtsResponse} from './types';

const ARTWORKS_URL = 'https://api.artic.edu/api/v1/artworks';
const IMAGE_PARAMS = 'full/300,/0/default.jpg';

const FIELDS = [
  'id',
  'title',
  'artist_display',
  'date_display',
  'thumbnail',
  'image_id',
].join(',');

const fetchArts = async (page = 1): Promise<ArtsResponse> => {
  const finalUrl = `${ARTWORKS_URL}?fields=${FIELDS}&page=${page}`;
  const response = await fetch(finalUrl).then(data => data.json());
  return response as ArtsResponse;
};

const getImageUrl = (baseUrl: string, artId: string): string =>
  `${baseUrl}/${artId}/${IMAGE_PARAMS}`;

export {fetchArts, getImageUrl};
