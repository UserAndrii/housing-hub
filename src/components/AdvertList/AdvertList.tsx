import React, { useEffect, useState } from 'react';
import Advert from '../Advert';
import s from './AdvertList.module.scss';
import { useSelector } from 'react-redux';
import { selectAd, selectIsLoading } from '../../redux/selectors';
import { ProgressBar } from 'react-loader-spinner';

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
  const isLoading = useSelector(selectIsLoading);
  const [showParagraph, setShowParagraph] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowParagraph(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const sortedAds = selectedPoint
    ? ads?.filter(({ _id }) => _id === selectedPoint)
    : ads?.filter(({ _id }) => visibleMarkers.includes(_id));

  return (
    <div className={s.container}>
      <h2 className={s.ads_title}>
        Знайдено {visibleMarkers?.length}{' '}
        {sortedAds?.length >= 4 ? 'оголошеннь' : 'оголошення'} на видимій
        території
      </h2>

      {isLoading && (
        <>
          <div className={s.ads_loader}>
            <ProgressBar
              visible={true}
              height="80"
              width="80"
              borderColor="#283149"
              barColor="#ceff7b"
              ariaLabel="progress-bar-loading"
            />
          </div>

          {showParagraph && (
            <p className={s.ads_loader_text}>
              Якщо це ваше перше завантаження, будь-ласка, зачекайте. Це може
              зайняти до 1 хвилини. Скоро сервер на Render.com прокинеться 😉
            </p>
          )}
        </>
      )}

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
        {sortedAds?.map(ad => (
          <li key={ad._id} onClick={() => setSelectedPoint(ad._id)}>
            <Advert {...ad} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdvertList;
