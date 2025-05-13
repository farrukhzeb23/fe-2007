import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import styles from './App.module.css';
import { Route, Routes } from 'react-router';
import GistList from './components/Gist/GistList';
import Profile from './components/Profile';
import GistDetails from './components/GistDetails';

function App() {
  return (
    <AuthProvider>
      <div className={styles.app}>
        <Navbar />
        <main className={styles.container}>
          <Routes>
            <Route index element={<GistList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/gists/:id" element={<GistDetails />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
