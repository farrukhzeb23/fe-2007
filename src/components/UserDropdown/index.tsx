import { AuthUser } from '../../types';
import { useAuth } from '../../context/AuthContext';
import styles from './UserDropdown.module.css';
import { Link } from 'react-router';

type Props = {
  user: AuthUser;
  onClose: () => void;
};

function UserDropdown({ user, onClose }: Props) {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
  };

  const handleMenuItemClick = () => {
    onClose();
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.userInfo}>
        <div className={styles.userInfoText}>Signed in as</div>
        <div
          className={styles.userInfoText}
          style={{ fontWeight: 700, color: '#003B44', marginBottom: '10px' }}
        >
          {user.name || user.login}
        </div>
      </div>

      <ul className={styles.menuList}>
        <li>
          <Link className={styles.menuItem} onClick={handleMenuItemClick} to="/gists">
            Your gists
          </Link>
        </li>
        <li>
          <Link className={styles.menuItem} onClick={handleMenuItemClick} to="/starred">
            Starred gists
          </Link>
        </li>
        <li>
          <Link className={styles.menuItem} to="/profile" onClick={onClose}>
            Your GitHub profile
          </Link>
        </li>
        <li className={styles.menuDivider}></li>
        <li>
          <Link className={styles.menuItem} onClick={handleMenuItemClick} to="/settings">
            Help
          </Link>
        </li>
        <li>
          <Link className={styles.menuItem} onClick={handleLogout} to="!#">
            Sign out
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default UserDropdown;
