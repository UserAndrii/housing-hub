import React from 'react';

import Advert from '../Advert';
import s from './AdvertList.module.scss';
import { useSelector } from 'react-redux';
import { selectAd } from '../../redux/selectors';

interface IProp {
  visibleMarkers: number[];
  selectedPoint: number | null;
  setSelectedPoint: (n: number | null) => void;
}

const AdvertList: React.FC<IProp> = ({
  selectedPoint,
  visibleMarkers,
  setSelectedPoint,
}) => {
  const ads = useSelector(selectAd);

  const sortedAds = selectedPoint
    ? ads.filter(({ id }) => id === selectedPoint)
    : ads.filter(({ id }) => visibleMarkers.includes(id));

  return (
    <div className={s.container}>
      <h2 className={s.ads_title}>
        Знайдено {visibleMarkers.length}{' '}
        {sortedAds.length >= 4 ? 'оголошеннь' : 'оголошення'} на видимій
        території
      </h2>

      {selectedPoint && (
        <div className={s.ads_select_wrap}>
          <p className={s.ads_select_text}>Обране 1 оголошення</p>
          <button
            className={s.fads_select_button}
            onClick={() => setSelectedPoint(null)}
          >
            Скасувати
          </button>
        </div>
      )}

      <ul className={s.ads_list}>
        {sortedAds.map(ad => (
          <li key={ad.id} onClick={() => setSelectedPoint(ad.id)}>
            <Advert {...ad} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdvertList;
