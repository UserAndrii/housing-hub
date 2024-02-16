import React from 'react';
import s from './AdvertList.module.scss';
import Advert from '../Advert';
import { IAd } from '../../types';

interface IProp {
  ads: IAd[];
}

const AdvertList: React.FC<IProp> = ({ ads }) => {
  return (
    <div className={s.container}>
      <ul className={s.ads_list}>
        {ads.map(ad => (
          <li key={ad.id}>
            <Advert {...ad} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdvertList;
