import Navbar from './components/Navbar';
import styles from './App.module.css';
import { Route, Routes } from 'react-router';
import ProtectedRoute from './components/ProtectedRoute';
import routes from './routes';
import { useAuthStore } from './stores/auth.store';
import { useEffect } from 'react';
import { getUser } from './api/gist.api';

function App() {
  const { isAuthenticated, setUser, setError, setLoading, token } = useAuthStore();

  useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      if (isAuthenticated && token) {
        try {
          setLoading(true);
          const userData = await getUser(token);

          setUser(userData);
          setError(null);
        } catch (error) {
          console.error('Error checking authentication:', error);
          setError('Authentication failed. Please check your token.');
        }
      }
      setLoading(false);
    };
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.app}>
      <Navbar />
      <main className={styles.container}>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path === '/' ? undefined : route.path}
              index={route.path === '/'}
              element={
                route.protected ? <ProtectedRoute>{route.element}</ProtectedRoute> : route.element
              }
            />
          ))}
        </Routes>
      </main>
    </div>
  );
}

export default App;
