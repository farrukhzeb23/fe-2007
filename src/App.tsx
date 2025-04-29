import GistList from './components/Gist/GistList';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="container">
        <GistList />
      </main>
    </div>
  );
}

export default App;
