import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
import icons from '../../images/icons/sprite.svg';

const Navigation = () => {
  const getClassName = (isActive, additionalClass) =>
    isActive
      ? `${styles.navLink} ${styles.active}`
      : `${styles.navLink} ${additionalClass}`;

  return (
    <div className={styles.navigation}>
      <NavLink
        to="/dashboard"
        end
        className={({ isActive }) => getClassName(isActive, '')}
      >
        <div className={styles.linkIcon}>
          <svg className={styles.homeIcon}>
            <use href={`${icons}#icon-home`}></use>
          </svg>
        </div>
        <span className={styles.linkText}>Home</span>
      </NavLink>

      <NavLink
        to="/dashboard/statistics"
        className={({ isActive }) => getClassName(isActive, '')}
      >
        <div className={styles.linkIcon}>
          <svg className={styles.statisticsIcon}>
            <use href={`${icons}#icon-statistics`}></use>
          </svg>
        </div>
        <span className={styles.linkText}>Statistics</span>
      </NavLink>

      <NavLink
        to="currency"
        className={({ isActive }) =>
          getClassName(isActive, styles.currencyLink)
        }
      >
        <div className={styles.linkIcon}>
          <svg className={styles.currencyIcon}>
            <use href={`${icons}#icon-currency`}></use>
          </svg>
        </div>
        <span className={styles.linkText}>Currency</span>
      </NavLink>
    </div>
  );
};

export default Navigation;
