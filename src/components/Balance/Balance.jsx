import React, { useEffect } from 'react';

import { selectBalance } from '../../redux/auth/selectors';
import styles from './Balance.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../redux/auth/operations';

function Balance() {
  const dispatch = useDispatch();

  function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  const balance = useSelector(selectBalance);

  return (
    <div className={styles.balance}>
      <h3>Your balance</h3>
      <p>$ {balance ? formatNumber(balance.toFixed(2)) : '0.00'}</p>
    </div>
  );
}

export default Balance;
