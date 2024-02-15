import React from 'react';

import Header from '../Header';
import s from './Layout.module.scss';

interface IProps {
  children?: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <div className={s.container}>
      <Header />
      <main className={s.main}>{children}</main>
    </div>
  );
};

export default Layout;
