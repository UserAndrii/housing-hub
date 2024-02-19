import React, { useEffect, useState } from 'react';
import s from './Loader.module.scss';

const Loader: React.FC = () => {
  const [showParagraph, setShowParagraph] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowParagraph(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className={s.loader}>
        <span>L</span>
        <span>o</span>
        <span>a</span>
        <span>d</span>
        <span>i</span>
        <span>n</span>
        <span>g</span>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>

      {showParagraph && (
        <p className={s.text}>
          Якщо це ваше перше завантаження, будь-ласка, зачекайте. Це може
          зайняти до 1 хвилини. Скоро сервер на Render.com прокинеться 😉
        </p>
      )}
    </>
  );
};

export default Loader;
