import { createContext, useContext } from 'react';
import { IMapContext } from '../types';

const defaultContextValue: IMapContext = {
  isLoaded: false,
  onPlaceSelect: () => {},
};

const IsLoadedMapContext = createContext<IMapContext>(defaultContextValue);

const useIsLoadedMap = () => {
  return useContext(IsLoadedMapContext);
};

export { IsLoadedMapContext, useIsLoadedMap };
