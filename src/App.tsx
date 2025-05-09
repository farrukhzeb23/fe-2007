import { useState } from 'react';
import GistList from './components/Gist/GistList';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import styles from './App.module.css';

function App() {
  const [search, setSearch] = useState('');
  return (
    <AuthProvider>
      <div className={styles.app}>
        <Navbar search={search} setSearch={setSearch} />
        <main className={styles.container}>
          <GistList search={search} />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
