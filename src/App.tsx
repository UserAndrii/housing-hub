import 'normalize.css';
import React from 'react';
import Layout from './components/Layout';
import Map from './components/Map';
import AdvertList from './components/AdvertList';
import { points } from './points';

const App: React.FC = () => {
  return (
    <Layout>
      <Map points={points} />
      <AdvertList ads={points} />
    </Layout>
  );
};

export default App;
