import React from 'react';
import s from './Hero.module.scss';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className={s.hero}>
      <h1 className={s.hero_title}>
        Знайдіть свої ідеальні <br /> умови для проживання
      </h1>
      <Link to="/housing-hub/advertisement">
        <div className={s.hero_map}></div>
      </Link>
    </div>
  );
};

export default Hero;
