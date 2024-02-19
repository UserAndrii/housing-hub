import React from 'react';
import { createPortal } from 'react-dom';
import s from './ModalWindow.module.scss';
import cn from 'classnames';

const modalRoot = document.querySelector<HTMLDivElement>('#root-module')!;

interface IProp {
  children?: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

const ModalWindow: React.FC<IProp> = ({ children, onClose, isOpen }) => {
  const handleBackdropClick = (event: { currentTarget: any; target: any }) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={cn(s.modal_overlay, { [s.closed]: !isOpen })}
      onClick={handleBackdropClick}
    >
      <div className={cn(s.modal_window, { [s.closed]: !isOpen })}>
        <button className={s.modal_close_btn} onClick={onClose}>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
          >
            <path d="M10 8.586l-7.071-7.071-1.414 1.414 7.071 7.071-7.071 7.071 1.414 1.414 7.071-7.071 7.071 7.071 1.414-1.414-7.071-7.071 7.071-7.071-1.414-1.414-7.071 7.071z"></path>
          </svg>
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default ModalWindow;
