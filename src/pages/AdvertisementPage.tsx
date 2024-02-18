import React, { useCallback, useEffect, useState } from 'react';
import { useJsApiLoader, Libraries } from '@react-google-maps/api';

import Map from '../components/Map';
import Layout from '../components/Layout';
import AdvertList from '../components/AdvertList';

import { getAdvert } from '../redux/operations';
import { useAppDispatch } from '../redux/store';
import { IsLoadedMapContext } from '../helpers';

const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY!;

const libraries: Libraries | undefined = ['places'];

const defaultCenter = {
  lat: 49.842957,
  lng: 24.031111,
};

const AdvertisementPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [center, setOnSelect] = useState(defaultCenter);
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const [visibleMarkers, setVisibleMarkers] = useState<number[]>([0]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: REACT_APP_API_KEY as string,
    libraries: libraries,
  });

  useEffect(() => {
    dispatch(getAdvert());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPlaceSelect = useCallback(
    (coordinates: React.SetStateAction<{ lat: number; lng: number }>) => {
      setOnSelect(coordinates);
    },
    []
  );

  return (
    <IsLoadedMapContext.Provider value={{ isLoaded, onPlaceSelect }}>
      {isLoaded ? (
        <Layout>
          <Map
            center={center}
            selectedPoint={selectedPoint}
            setSelectedPoint={setSelectedPoint}
            setVisibleMarkers={setVisibleMarkers}
          />
          <AdvertList
            selectedPoint={selectedPoint}
            visibleMarkers={visibleMarkers}
            setSelectedPoint={setSelectedPoint}
          />
        </Layout>
      ) : (
        <h2>Loading...</h2>
      )}
    </IsLoadedMapContext.Provider>
  );
};

export default AdvertisementPage;
