import React, {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import {ArtItem, ConfigData} from '../api/types';

type ArtContextType = {
  arts: ArtItem[];
  config: ConfigData | null;
  page: number;
  setArts: Dispatch<SetStateAction<ArtItem[]>>;
  setConfig: Dispatch<SetStateAction<ConfigData | null>>;
  setPage: Dispatch<SetStateAction<number>>;
};

export const ArtsContext = createContext<ArtContextType>({
  arts: [],
  config: null,
  page: 1,
  setArts: (() => null) as Dispatch<SetStateAction<ArtItem[]>>,
  setConfig: (() => null) as Dispatch<SetStateAction<ConfigData | null>>,
  setPage: (() => null) as Dispatch<SetStateAction<number>>,
});

export const ArtsProvider: FC<{children: ReactNode}> = ({children}) => {
  const [arts, setArts] = useState<ArtItem[]>([]);
  const [page, setPage] = useState(1);
  const [config, setConfig] = useState<ConfigData | null>(null);

  const value = {arts, setArts, config, setConfig, page, setPage};

  return <ArtsContext.Provider value={value}>{children}</ArtsContext.Provider>;
};
