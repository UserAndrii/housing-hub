import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Hero />
        <Footer />
      </div>
    </Layout>
  );
};

export default HomePage;
