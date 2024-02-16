import React from 'react';
import s from './Header.module.scss';
import logo from '../../images/hh-logo.png';
import cn from 'classnames';

const Header: React.FC = () => {
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
              Apartments for rent
            </a>
          </li>
          <li className={s.header_item}>
            <a className={cn(s.header_link, s.disabled)} href="/add">
              Advertisement
            </a>
          </li>
          <li className={s.header_item}>
            <a className={cn(s.header_link, s.disabled)} href="/auction">
              Auction
            </a>
          </li>
        </ul>

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
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            Submit an ad
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
