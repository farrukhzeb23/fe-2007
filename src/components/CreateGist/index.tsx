import styles from './CreateGist.module.css';
import CreateGistForm from './CreateGistForm';

export const CreateGist = () => {
  return (
    <div>
      <div className={styles.gistListHeader}>
        <h2>Create Gist</h2>
      </div>
      <div className={styles.body}>
        <CreateGistForm />
      </div>
    </div>
  );
};
