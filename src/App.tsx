import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import styles from './App.module.css';
import { Route, Routes } from 'react-router';
import ProtectedRoute from './components/ProtectedRoute';
import routes from './routes';

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
