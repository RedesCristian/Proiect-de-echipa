import { useState } from 'react';
import styles from './Footer.module.css';

import icons from '../../images/icons/sprite.svg';
import { createPortal } from 'react-dom';
import ModalFooter from 'components/ModalFooter/ModalFooter';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <footer className={styles.footer}>
        <div>
          <p>
             Developed with
            <span className={styles.icon}>
              <svg width="14px" height="12.88px">
                <use href={`${icons}#icon-heart`}></use>
              </svg>
            </span>
            by
            <span
              className={styles.students}
              onClick={() => setIsModalOpen(true)}
            >
              GoIT Students
            </span>
          </p>
        </div>
      </footer>

      {isModalOpen &&
        createPortal(
          <ModalFooter closeModal={() => setIsModalOpen(false)} />,
          document.body
        )}
    </>
  );
};

export default Footer;
