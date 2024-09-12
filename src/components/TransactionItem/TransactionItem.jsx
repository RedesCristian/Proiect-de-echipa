import styles from './TransactionItem.module.css';
import icons from '../../images/icons/sprite.svg';
import {
  formatData,
  getTransactionCategory,
} from '../../constants/TransactionConstants';
import { useDispatch } from 'react-redux';
import {
  setTrasactionForUpdate,
  setTrasactionIdForDelete,
} from '../../redux/transactions/slice';

const TransactionItem = ({ transaction, openDeleteModal, openEditModal }) => {
  const { type, categoryId, comment, amount, transactionDate } = transaction;

  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    openDeleteModal();
    dispatch(setTrasactionIdForDelete(transaction.id));
  };

  const handleEditClick = () => {
    openEditModal();
    dispatch(setTrasactionForUpdate({ ...transaction }));
  };

  let textClass = '';
  let borderClass = '';

  if (type === 'INCOME') {
    textClass = styles.incomeText;
    borderClass = styles.incomeBorder;
  } else if (type === 'EXPENSE') {
    textClass = styles.expenseText;
    borderClass = styles.expenseBorder;
  }

  return (
    <li className={`${styles.TransactionItem} ${borderClass}`}>
      <div className={`${styles.row} ${styles.firstRow}`}>
        <span className={styles.fixData}>Date</span>
        <span className={styles.dynamicData}>
          {formatData(transactionDate)}
        </span>
      </div>
      <div className={`${styles.row} ${styles.secondRow}`}>
        <span className={styles.fixData}>Type</span>
        <span className={styles.dynamicData}>
          {type === 'INCOME' ? '+' : '-'}
        </span>
      </div>
      <div className={`${styles.row} ${styles.thirdRow}`}>
        <span className={styles.fixData}>Category</span>
        <span className={styles.dynamicData}>
          {getTransactionCategory(categoryId)}
        </span>
      </div>
      <div className={`${styles.row} ${styles.forthRow}`}>
        <span className={styles.fixData}>Comment</span>
        <span className={styles.dynamicData}>{comment}</span>
      </div>
      <div className={`${styles.row} ${styles.fifthRow}`}>
        <span className={styles.fixData}>Sum</span>
        <span className={`${styles.dynamicData} ${textClass}`}>
          {type === 'INCOME' ? amount : amount * -1}
        </span>
      </div>
      <div className={`${styles.row} ${styles.sixthRow}`}>
        <button
          type="button"
          className={styles.deleteButton}
          onClick={handleDeleteClick}
        >
          Delete
        </button>
        <button
          className={styles.editButton}
          type="button"
          onClick={handleEditClick}
        >
          <svg className={styles.editIcon}>
            <use href={`${icons}#icon-edit`}></use>
          </svg>
          <span className={styles.editText}>Edit</span>
        </button>
      </div>
    </li>
  );
};

export default TransactionItem;
