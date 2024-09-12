import TransactionItem from 'components/TransactionItem/TransactionItem';
import styles from './TransactionsList.module.css';

const TransactionsList = ({ data, openDeleteModal, openEditModal }) => {
  return (
    <ul className={styles.TransactionList}>
      {data.map(item => (
        <TransactionItem
          key={item.id}
          transaction={item}
          openDeleteModal={openDeleteModal}
          openEditModal={openEditModal}
        />
      ))}
    </ul>
  );
};

export default TransactionsList;
