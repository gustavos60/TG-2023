export type PaginationData = {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
  next_url: string;
};

export type InfoData = {
  license_text: string;
  license_links: string[];
  version: string;
};

export type ConfigData = {
  iiif_url: string;
  website_url: string;
};

export type ArtItem = {
  id: number;
  title: string;
  thumbnail: null | {
    lqip: string;
    width: number;
    height: number;
    alt_text: string;
  };
  date_display: string;
  artist_display: string;
  classification_title: string;
  image_id: string;
};

export type ArtsResponse = {
  pagination: PaginationData;
  data: ArtItem[];
  info: InfoData;
  config: ConfigData;
};
