import { useParams } from 'react-router';
import { Gist, GistFile } from '../../types';
import styles from './GistDetails.module.css';
import CodeBlock from '../CodeBlock';
import { timeElapsed } from '../../utils/date.utils';
import ActionButton from './ActionButton';
import ForkIcon from '../../assets/icons/repo-fork-white.svg';
import StarIcon from '../../assets/icons/star-white.svg';
import { useGetGist } from '../../hooks/useGetGist';
import { useAuthStore } from '../../stores/auth.store';

function GistDetailsHeader({ gist, gistFile }: { gist: Gist; gistFile: GistFile }) {
  const { isAuthenticated } = useAuthStore();
  return (
    <div className={styles.header}>
      <div className={styles.userInfoWrapper}>
        <img src={gist.owner?.avatar_url} alt="Avatar" className={styles.avatar} />
        <div className={styles.userInfo}>
          <div className={styles.gistTitle}>
            <span className={styles.cardAuthor}>{gist.owner?.login} / </span>
            <span className={styles.cardName}>{gistFile.filename}</span>
          </div>
          <p>Created {timeElapsed(new Date(gist.created_at))}</p>
          <p>{gist.description}</p>
        </div>
      </div>
      {isAuthenticated && (
        <div className={styles.actionButtons}>
          <ActionButton
            icon={ForkIcon}
            label="Fork"
            onClick={() => {
              console.log('Fork clicked');
            }}
            count={gist.forks.length}
          />
          <ActionButton
            icon={StarIcon}
            label="Star"
            onClick={() => {
              console.log('Star clicked');
            }}
            count={gist.forks.length}
          />
        </div>
      )}
    </div>
  );
}

function GistDetails() {
  const { id } = useParams();
  const { data: gist, error, isLoading } = useGetGist(id as string);

  if (isLoading) {
    return <div className={styles.loader}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error.message || 'Error while fetching gist'}</div>;
  }

  if (!gist) {
    return <div className={styles.error}>Gist not found</div>;
  }

  const gistFile = Object.values(gist.files)[0] as GistFile;
  const gistFiles = Object.values(gist.files);

  const determineLanguage = (fileName: string): string => {
    const extension = fileName.split('.').pop() || '';
    return extension;
  };

  return (
    <div>
      <GistDetailsHeader gist={gist} gistFile={gistFile} />
      {gistFiles.map((file) => {
        const fileLanguage = determineLanguage(file.filename);
        return (
          <div key={file.filename} className={styles.codeBlockWrapper}>
            <div className={styles.codeBlockHeader}>
              <p>{file.filename}</p>
            </div>
            <div className={styles.codeBlock}>
              <CodeBlock code={''} key={gist.id} language={fileLanguage} url={file.raw_url} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default GistDetails;
