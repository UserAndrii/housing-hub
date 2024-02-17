import React, { useEffect, useState } from 'react';
import s from './Advert.module.scss';
import mapIcon from '../../images/map.svg';
import { IAd } from '../../types';
import axios from 'axios';

const Advert: React.FC<IAd> = ({
  position,
  title,
  price,
  images,
  description,
}) => {
  const [cityName, setCityName] = useState('');

  useEffect(() => {
    const fetchCityName = async (position: number[]) => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position[0]}&lon=${position[1]}`
        );
        if (response.data.address?.city) {
          setCityName(response.data.address.city);
        }
      } catch (error) {
        console.error('Error fetching city name:', error);
      }
    };

    if (position.length > 0) {
      fetchCityName(position);
    }
  }, [position]);

  return (
    <div className={s.ad_container}>
      <div className={s.ad_image_wrap}>
        <img className={s.ad_image} src={images} alt={title} />
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
        <p>{cityName || 'Україна'}</p>
      </div>
    </div>
  );
};

export default Advert;
