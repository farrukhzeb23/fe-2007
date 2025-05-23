import { ChangeEvent, useState, useRef, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import MagnifyIcon from '../../assets/icons/magnify.svg';
import UserDropdown from '../UserDropdown';
import styles from './Navbar.module.css';
import { useAuthStore } from '../../stores/auth.store';
import { getUser } from '../../api/gist.api';

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLImageElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const { setUser, setAuthenticated, setError, setLoading, isAuthenticated, isLoading, user } =
    useAuthStore();

  const login = async () => {
    try {
      setLoading(true);
      setError(null);

      const userData = await getUser();

      setUser(userData);
      setAuthenticated(true);
    } catch (error) {
      setError('Authentication failed. Please check your token.');

      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');

    setUser(null);
    setAuthenticated(false);
  };

  const handleLoginLogout = () => {
    if (isAuthenticated) {
      logout();
    } else {
      login();
    }
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  // Handle search input changes
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    // Update URL search parameter
    const newSearchParams = new URLSearchParams(searchParams);
    if (value) {
      newSearchParams.set('search', value);
    } else {
      newSearchParams.delete('search');
    }
    setSearchParams(newSearchParams);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const searchValue = searchParams.get('search') || '';
    setSearch(searchValue);
  }, [searchParams]);

  return (
    <nav className={styles.navbar}>
      <Link to={'/'}>
        <img src="/images/logo.svg" alt="logo" className="logo" />
      </Link>
      <div className={styles.navbarActions}>
        <div className={styles.searchBar}>
          <img src={MagnifyIcon} alt="magnify" className="icon" />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search Gists..."
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        {isAuthenticated && user ? (
          <div className={styles.userContainer}>
            <img
              ref={avatarRef}
              src={user.avatar_url}
              alt={user.login}
              className={styles.userAvatar}
              onClick={toggleDropdown}
            />
            {showDropdown && (
              <div ref={dropdownRef}>
                <UserDropdown user={user} onClose={() => setShowDropdown(false)} />
              </div>
            )}
          </div>
        ) : (
          <button onClick={handleLoginLogout} disabled={isLoading}>
            {isLoading ? 'Logging In...' : isAuthenticated ? 'Logout' : 'Login'}
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
