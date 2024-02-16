import React, { useEffect, useState } from 'react';
import s from './Header.module.scss';
import logo from '../../images/hh-logo.png';
import cn from 'classnames';

const Header: React.FC = () => {
  const [uanRate, setUanRate] = useState<number>(1.0);

  useEffect(() => {
    fetchUsdRate();
  }, []);

  const fetchUsdRate = async () => {
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
  };

  return (
    <header className={s.header_container}>
      <div className={s.hesder_content}>
        <a className={s.header_logo} href="./">
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
        </a>

        <ul className={s.header_list}>
          <li className={s.header_item}>
            <a className={s.header_link} href="/rent">
              Advertisement
            </a>
          </li>
          <li className={s.header_item}>
            <a className={cn(s.header_link, s.disabled)} href="/auction">
              Auction
            </a>
          </li>
          <li className={s.header_item}>
            <a className={cn(s.header_link, s.disabled)} href="/about">
              About us
            </a>
          </li>
        </ul>

        <div className={s.header_action_wrap}>
          <button className={s.header_add_btn}>
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
              Submit an ad
            </span>
          </button>

          <div className={s.uan_rate_wrap}>
            <span className={s.uan_rate}>UAH: ₴{uanRate.toFixed(2)} / $1</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
