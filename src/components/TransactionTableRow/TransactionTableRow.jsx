import {
  formatData,
  getTransactionCategory,
} from '../../constants/TransactionConstants';
import icons from '../../images/icons/sprite.svg';
import styles from './TransactionTableRow.module.css';
import {
  setTrasactionForUpdate,
  setTrasactionIdForDelete,
} from '../../redux/transactions/slice';
import { useDispatch } from 'react-redux';

const TransactionTableRow = ({
  transaction,
  openDeleteModal,
  openEditModal,
}) => {
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

  return (
    <tr className={styles.dataRow}>
      <td className={styles.TransactionDateColumn}>
        {formatData(transactionDate)}
      </td>
      <td className={styles.TransactionTypeColumn}>
        {type === 'INCOME' ? '+' : '-'}
      </td>
      <td className={styles.TransactionCategoryColumn}>
        {getTransactionCategory(categoryId)}
      </td>
      <td className={styles.TransactionCommentColumn}>{comment}</td>
      <td
        className={type === 'INCOME' ? styles.incomeText : styles.expenseText}
      >
        {type === 'INCOME' ? amount : amount * -1}
      </td>
      <td className={styles.TransactionEditColumn}>
        <button
          className={styles.editButton}
          type="button"
          onClick={handleEditClick}
        >
          <svg className={styles.editIcon}>
            <use href={`${icons}#icon-edit`}></use>
          </svg>
        </button>
      </td>

      <td className={styles.TransactionDeleteColumn}>
        <button
          className={styles.deleteButton}
          type="button"
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TransactionTableRow;
