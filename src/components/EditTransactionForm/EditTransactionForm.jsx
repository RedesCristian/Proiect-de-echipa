import { useState } from 'react';
import styles from './EditTransactionForm.module.css';

import FormButton from 'components/common/FormButton/FormButton';
import icons from '../../images/icons/sprite.svg';
import { useMediaQuery } from 'react-responsive';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { getTransactionCategory } from '../../constants/TransactionConstants';

import { useSelector } from 'react-redux';
import { selectTransactionForUpdate } from '../../redux/transactions/selectors';
import { modifyTransaction } from '../../redux/transactions/operations';
import { getUserInfo } from '../../redux/auth/operations';
import { FiCalendar } from 'react-icons/fi';

const EditTransactionForm = ({ closeModal }) => {
  const transactionForUpdate = useSelector(selectTransactionForUpdate);

  const { id, type, amount, comment, transactionDate, categoryId } =
    transactionForUpdate;

  const [startDate, setStartDate] = useState(new Date(transactionDate));

  console.log(startDate);

  const isOnIncomeTab = type === 'INCOME' ? true : false;

  const screenCondition = useMediaQuery({ query: '(min-width: 768px)' });

  const dispatch = useDispatch();

  const initialValues = {
    amount: type === 'INCOME' ? amount : amount * -1,
    comment,
  };

  const validationSchema = Yup.object({
    amount: Yup.string().required('Required*'),
    comment: Yup.string().required('Required*'),
  });

  const handleSubmit = (values, { setSubmitting, setStatus }) => {
    setSubmitting(true);
    dispatch(
      modifyTransaction({
        transactionId: id,
        transactionData: {
          transactionDate: startDate,
          comment: values.comment,
          amount: isOnIncomeTab ? values.amount : 0 - values.amount,
        },
      })
    )
      .unwrap()
      .then(() => {
        closeModal();
        dispatch(getUserInfo());
      })
      .catch(error => {
        setStatus({ success: false, error: error });
        setSubmitting(false);
      });
  };

  return (
    <div className={styles.modalContent}>
      {screenCondition && (
        <button className={styles.closeButton} onClick={() => closeModal()}>
          <svg>
            <use href={`${icons}#icon-close`}></use>
          </svg>
        </button>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <h2 className={styles.formTitle}>Edit transaction</h2>

            <div className={styles.switcheWrapper}>
              <span className={`${isOnIncomeTab ? styles.income : null}`}>
                Income
              </span>
              <span className={styles.delimeter}>/</span>
              <span className={`${!isOnIncomeTab ? styles.expense : null}`}>
                Expense
              </span>
            </div>

            <div className={styles.inputWrapper}>
              {!isOnIncomeTab && (
                <div className={`${styles.inputField} ${styles.category}`}>
                  Category: <span>{getTransactionCategory(categoryId)}</span>
                </div>
              )}

              <div className={`${styles.inputField} ${styles.amount}`}>
                <Field type="number" name="amount" min="1" placeholder="0.00" />
                <ErrorMessage name="amount" component="p" />
              </div>

              <div className={`${styles.inputField} ${styles.date}`}>
                <ReactDatePicker
                  dateFormat="dd.MM.yyyy"
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  calendarStartDay={1}
                />
                <FiCalendar className={styles.icon} />
              </div>

              <div className={`${styles.inputField} ${styles.comment}`}>
                <Field type="text" name="comment" placeholder="Comment" />
                <ErrorMessage name="comment" component="p" />
              </div>
            </div>

            <div className={styles.buttonsWrapper}>
              <FormButton
                type={'submit'}
                text={'save'}
                variant={'multiColorButtton'}
                isDisabled={isSubmitting}
              />
              <FormButton
                type={'button'}
                text={'cancel'}
                variant={'whiteButtton'}
                handlerFunction={() => closeModal()}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditTransactionForm;
