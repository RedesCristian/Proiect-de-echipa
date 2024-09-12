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
  });

  const closeOnClickOutside = event => {
    event.currentTarget === event.target && closeModal();
  };

  const screenCondition = useMediaQuery({ query: '(min-width: 768px)' });

  const animation = 'animate__animated animate__fadeInDown  animate__slow';

  return (
    <div className={styles.modalFooter} onClick={closeOnClickOutside}>
      <div className={styles.modalContent}>
        {screenCondition && <Logo variant={'formLogo'} />}

        <h2>Team:</h2>


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
