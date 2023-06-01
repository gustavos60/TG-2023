import {ArtsResponse} from './types';

const ARTWORKS_URL = 'https://api.artic.edu/api/v1/artworks';
const IMAGE_PARAMS = 'full/100,/0/default.jpg';
const PAGE_SIZE = 8;

const config: RequestInit = {
  headers: {
    'AIC-User-Agent': 'gustavo (gustavos60@gmail.com)',
  },
};

const FIELDS = [
  'id',
  'title',
  'artist_display',
  'date_display',
  'thumbnail',
  'image_id',
].join(',');

const fetchArts = async (page = 1): Promise<ArtsResponse> => {
  const finalUrl = `${ARTWORKS_URL}?fields=${FIELDS}&page=${page}&limit=${PAGE_SIZE}`;
  const response = await fetch(finalUrl, config).then(data => data.json());
  return response as ArtsResponse;
};

const searchArts = async (query: string): Promise<ArtsResponse> => {
  const finalUrl = `${ARTWORKS_URL}/search?q=${query}&fields=${FIELDS}&size=${PAGE_SIZE}`;
  const response = await fetch(finalUrl, config).then(data => data.json());
  return response as ArtsResponse;
};

const getImageUrl = (baseUrl: string, artId: string): string =>
  `${baseUrl}/${artId}/${IMAGE_PARAMS}`;

export {fetchArts, getImageUrl, searchArts};
