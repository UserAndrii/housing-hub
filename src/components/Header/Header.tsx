import { NavLink, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import cn from 'classnames';
import s from './Header.module.scss';
import ModalWindow from '../ModalWindow';
import logo from '../../images/hh-logo.png';
import AddAdvertForm from '../AddAdvertForm';

const Header: React.FC = () => {
  const location = useLocation();
  const [uanRate, setUanRate] = useState(1.0);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchUsdRate();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: { key: string }) => {
      if (event.key === 'Escape') {
        handleCloseModal();
      }
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  async function fetchUsdRate() {
    try {
      const response = await fetch(
        'https://openexchangerates.org/api/latest.json?app_id=42adbad9cd4c4cb08209fe44c4ceb348'
      );
      const data = await response.json();
      const uanRate = data.rates.UAH;
      setUanRate(uanRate);
    } catch (error) {
      console.error('Error fetching UAH rate:', error);
    }
  }

  function handleOpenModal() {
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  }

  function handleCloseModal() {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  }

  return (
    <>
      <header className={s.header_container}>
        <div className={s.hesder_content}>
          <NavLink className={s.header_logo} to="/housing-hub">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <img
              className={s.logo}
              src={logo}
              alt="Logo"
              width={40}
              height={40}
            />
            <p className={s.header_logo_text}>HousingHub</p>
          </NavLink>

          <ul className={s.header_list}>
            <li className={s.header_item}>
              <NavLink
                className={cn(s.header_link, {
                  [s.active]:
                    location.pathname === '/housing-hub/advertisement',
                })}
                to="/housing-hub/advertisement"
              >
                Оголошення
              </NavLink>
            </li>
            <li className={s.header_item}>
              <NavLink
                className={cn(s.header_link, s.disabled)}
                to="/housing-hub/auction"
              >
                Аукціон
              </NavLink>
            </li>
            <li className={s.header_item}>
              <NavLink
                className={cn(s.header_link, s.disabled)}
                to="/housing-hub/about"
              >
                Про нас
              </NavLink>
            </li>
          </ul>

          <div className={s.header_action_wrap}>
            <button
              className={s.header_add_btn}
              onClick={() => handleOpenModal()}
            >
              <span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 7H1M7 13V7V13ZM7 7V1V7ZM7 7H13H7Z"
                    stroke="#283149"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                Додати оголошення
              </span>
            </button>

            <div className={s.uan_rate_wrap}>
              <span className={s.uan_rate}>
                UAH: ₴{uanRate.toFixed(2)} / $1
              </span>
            </div>
          </div>
        </div>
      </header>

      <ModalWindow onClose={handleCloseModal} isOpen={isModalOpen}>
        <AddAdvertForm onClose={handleCloseModal} isOpen={isModalOpen} />
      </ModalWindow>
    </>
  );
};

export default Header;
