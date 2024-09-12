import styles from './LoadingScreen.module.css';
import 'animate.css';

const LoadingScreen = ({ text }) => {
  const textAnimationClases =
    'animate__animated animate__flash animate__infinite animate__slow';

  return (
    <>
      <div className={styles.bgImg}>
        <div className={styles.blur}></div>
      </div>

      {text && (
        <h1 className={`${styles.contentText} ${textAnimationClases}`}>
          {text}
        </h1>
      )}

     
    </>
  );
};

export default LoadingScreen;
