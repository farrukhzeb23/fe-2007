import styles from './GistLoader.module.css';

function GistLoader() {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loader} />
      <div className={styles.loader} />
      <div className={styles.loader} />
    </div>
  );
}

export default GistLoader;
