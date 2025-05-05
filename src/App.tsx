import { useState } from 'react';
import GistList from './components/Gist/GistList';
import Navbar from './components/Navbar';

function App() {
  const [search, setSearch] = useState('');
  return (
    <div className="App">
      <Navbar search={search} setSearch={setSearch} />
      <main className="container">
        <GistList search={search} />
      </main>
    </div>
  );
}

export default App;
