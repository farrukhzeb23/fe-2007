import MagnifyIcon from '../assets/icons/magnify.svg';

function Navbar() {
  return (
    <nav className="navbar">
      <img src="/images/logo.svg" alt="logo" className="logo" />
      <div className="navbar-actions">
        <div className="search-bar">
          <img src={MagnifyIcon} alt="magnify" className="icon" />
          <input type="text" name="search" id="search" placeholder="Search Gists..." />
        </div>
        <button>Login</button>
      </div>
    </nav>
  );
}

export default Navbar;
