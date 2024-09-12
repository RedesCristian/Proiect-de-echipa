import styles from './ButtonAddTransactions.module.css';
import icons from '../../images/icons/sprite.svg';

const ButtonAddTransactions = ({ openAddModall }) => {
  return (
    <button
      className={styles.ButtonOpenModal}
      type="button"
      onClick={openAddModall}
    >
      <svg>
        <use href={`${icons}#addBtn-icon`}></use>
      </svg>
    </button>
  );
};

export default ButtonAddTransactions;
