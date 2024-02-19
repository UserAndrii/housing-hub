import React from 'react';

import { IAd } from '../../types';

import s from './Advert.module.scss';
import mapIcon from '../../images/map.svg';
import stubPhoto from '../../images/default-image.png';

const Advert: React.FC<IAd> = ({ title, price, image, description }) => {
  return (
    <div className={s.ad_container}>
      <div className={s.ad_image_wrap}>
        <img className={s.ad_image} src={image || stubPhoto} alt={title} />
        <div className={s.ad_price_wrap}>
          <p className={s.ad_price}>
            Ціна: <span className={s.ad_price_accent}>${price}</span>
          </p>
        </div>
      </div>
      <h3 className={s.ad_title}>{title}</h3>
      <p className="">{description}</p>
      <div className={s.ad_location_wrap}>
        <img className={s.ad_location_icon} src={mapIcon} alt="Location Icon" />
        <p>Україна</p>
      </div>
    </div>
  );
};

export default Advert;
