import React from 'react';
import s from './Footer.module.scss';

import { FaLinkedin, FaGithub, FaTelegram, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className={s.footer}>
      <p className={s.footer_text}>
        Якщо вам сподобалася моя робота або ви хочете побачити більше моїх
        проектів, ви можете зв’язатися зі мною за наступними методами:
      </p>

      <div>
        <a
          className={s.footer_link}
          href="https://www.linkedin.com/in/andrii-hadar/"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin size={30} />
        </a>
        <a
          className={s.footer_link}
          href="https://github.com/UserAndrii"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub size={30} />
        </a>
        <a
          className={s.footer_link}
          href="https://t.me/andrii_hadar"
          target="_blank"
          rel="noreferrer"
        >
          <FaTelegram size={30} />
        </a>
        <a
          className={s.footer_link}
          href="https://www.instagram.com/gadarandre/"
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagram size={30} />
        </a>
        <div>
          <p className={s.footer_copyright}>
            &copy; 2023 | Created by Andrii Hadar.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
