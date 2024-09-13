import { useEffect } from 'react';
import styles from './ModalFooter.module.css';
import { useMediaQuery } from 'react-responsive';
import Logo from 'components/common/Logo/Logo';
import FormButton from 'components/common/FormButton/FormButton';
import 'animate.css';

const ModalFooter = ({ closeModal }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const addCloseEvent = event => {
      event.key === 'Escape' && closeModal();
    };
    document.addEventListener('keydown', addCloseEvent);

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', addCloseEvent);
    };
  }, [closeModal]); // Added closeModal to the dependency array

  const closeOnClickOutside = event => {
    event.currentTarget === event.target && closeModal();
  };

  const screenCondition = useMediaQuery({ query: '(min-width: 768px)' });
  const animation = 'animate__animated animate__fadeInDown animate__slow';

  return (
    <div className={styles.modalFooter} onClick={closeOnClickOutside}>
      <div className={styles.modalContent}>
        {screenCondition && <Logo variant={'formLogo'} />}

        <h2>Team</h2>
        <ul className={styles.teamList}>
          <li>
            <a
              href="https://github.com/CristinaBubu"
              target="_blank"
              rel="noreferrer"
            >
              Cristina Bubu
            </a>
          </li>
          <li>
            <a
              href="https://github.com/roxananecsoi"
              target="_blank"
              rel="noreferrer"
            >
              Roxana Necsoi
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Dragos0129"
              target="_blank"
              rel="noreferrer"
            >
              Dragos Baba
            </a>
          </li>
          <li>
            <a
              href="https://github.com/NicuBac"
              target="_blank"
              rel="noreferrer"
            >
              Baciu Nicolae
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Ridl123"
              target="_blank"
              rel="noreferrer"
            >
              Prudel Richard-Iulian
            </a>
          </li>
          <li>
            <a
              href="https://github.com/RedesCristian"
              target="_blank"
              rel="noreferrer"
            >
              Redes Cristian
            </a>
          </li>
        </ul>

        <div className={`${styles.thanksBtn} ${animation}`}>
          <FormButton
            type={'button'}
            text={'Thank You'}
            variant={'whiteButtton'}
            handlerFunction={() => closeModal()}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalFooter;
