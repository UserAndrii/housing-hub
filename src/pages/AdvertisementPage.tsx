import React from 'react';

import Map from '../components/Map';
import Layout from '../components/Layout';
import AdvertList from '../components/AdvertList';

import { points } from '../points';
import { useJsApiLoader } from '@react-google-maps/api';

const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY!;

const center = {
  lat: 49.842957,
  lng: 24.031111,
};

const AdvertisementPage: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: REACT_APP_API_KEY,
  });

  return (
    <Layout>
      {isLoaded ? <Map points={points} center={center} /> : <h2>Loading...</h2>}
      <AdvertList ads={points} />
    </Layout>
  );
};

export default AdvertisementPage;
