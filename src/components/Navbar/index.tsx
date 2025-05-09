import { ChangeEvent } from 'react';
import MagnifyIcon from '../../assets/icons/magnify.svg';
import { useAuth } from '../../context/AuthContext';
import styles from './Navbar.module.css';

type Props = {
  search: string;
  setSearch: (search: string) => void;
};

function Navbar({ search, setSearch }: Props) {
  const { isAuthenticated, user, loading, login, logout } = useAuth();

  const handleLoginLogout = () => {
    if (isAuthenticated) {
      logout();
    } else {
      login();
    }
  };

  return (
    <nav className={styles.navbar}>
      <img src="/images/logo.svg" alt="logo" className="logo" />
      <div className={styles.navbarActions}>
        <div className={styles.searchBar}>
          <img src={MagnifyIcon} alt="magnify" className="icon" />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search Gists..."
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          />
        </div>
        {isAuthenticated && user ? (
          <div>
            <img src={user.avatar_url} alt={user.login} className={styles.userAvatar} />
          </div>
        ) : (
          <button onClick={handleLoginLogout} disabled={loading}>
            {loading ? 'Loading...' : isAuthenticated ? 'Logout' : 'Login'}
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
