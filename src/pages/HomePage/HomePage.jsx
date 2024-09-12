import { useEffect, useState } from 'react';

import ButtonAddTransactions from 'components/ButtonAddTransactions/ButtonAddTransactions';
import TransactionsList from 'components/TransactionsList/TransactionsList';
import TransactionsTable from 'components/TransactionsTable/TransactionsTable';
import { useMediaQuery } from 'react-responsive';
import styles from './HomePage.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { selectAllTransactions } from '../../redux/transactions/selectors';
import { fetchAllTransactions } from '../../redux/transactions/operations';

import { createPortal } from 'react-dom';
import ModalDeleteTransaction from 'components/ModalDeleteTransaction/ModalDeleteTransaction';
import ModalAddTransactionNew from 'components/ModalAddTransaction/ModalAddTransaction';
import ModalEditTransaction from 'components/ModalEditTransaction/ModalEditTransaction';
import Balance from 'components/Balance/Balance';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTransactions());
  }, [dispatch]);

  const data = useSelector(selectAllTransactions);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setisEditModalOpen] = useState(false);

  const screenCondition = useMediaQuery({ query: '(min-width: 768px)' });

  const [forcedLoading, setForcedLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setForcedLoading(false), 1500);
  }, [forcedLoading]);

  const animation = 'animate__animated  animate__fadeIn animate__slow';

  return (
    <>
      <div className={`${styles.HomePage} ${animation}`}>
        {!screenCondition && <Balance />}

        {data?.length === 0 && (
          <p className={styles.noDataMessage}>
            There are no saved transactions to be displayed. You can press the
            plus button in the bottom left corner to add some
          </p>
        )}

        {data?.length > 0 && screenCondition ? (
          <TransactionsTable
            data={data}
            openDeleteModal={() => setIsDeleteModalOpen(true)}
            openEditModal={() => setisEditModalOpen(true)}
          />
        ) : (
          <TransactionsList
            data={data}
            openDeleteModal={() => setIsDeleteModalOpen(true)}
            openEditModal={() => setisEditModalOpen(true)}
          />
        )}

        <ButtonAddTransactions openAddModall={() => setIsAddModalOpen(true)} />
      </div>

      <>
        {isAddModalOpen &&
          createPortal(
            <ModalAddTransactionNew
              closeModal={() => setIsAddModalOpen(false)}
            />,
            document.body
          )}

        {isDeleteModalOpen &&
          createPortal(
            <ModalDeleteTransaction
              closeModal={() => setIsDeleteModalOpen(false)}
            />,
            document.body
          )}

        {isEditModalOpen &&
          createPortal(
            <ModalEditTransaction
              closeModal={() => setisEditModalOpen(false)}
            />,
            document.body
          )}
      </>
    </>
  );
};

export default HomePage;
