import 'normalize.css';
import React from 'react';
import Layout from './components/Layout';
import Map from './components/Map';

const App: React.FC = () => {
  return (
    <Layout>
      <Map />
    </Layout>
  );
};

export default App;
