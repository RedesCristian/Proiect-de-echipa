import { useEffect } from 'react';
import styles from './ModalEditTransaction.module.css';
import EditTransactionForm from 'components/EditTransactionForm/EditTransactionForm';

const ModalEditTransactionNew = ({ closeModal }) => {
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
    event.target === event.currentTarget && closeModal();
  };

  return (
    <>
      <div className={styles.editModal} onClick={closeOnClickOutside}>
        <EditTransactionForm closeModal={closeModal} />
      </div>
    </>
  );
};

export default ModalEditTransactionNew;
