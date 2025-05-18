import styles from './NotFound.module.css';

function NotFound() {
  return (
    <div className={styles.notFound}>
      <h1>404</h1>
      <p>Page not found</p>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}

export default NotFound;
