import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header>
      <nav className='nav'>
        <img src={logo} className="App-logo" alt="logo" />

        <ul className='nav-menu'>
          <li className='nav-item'><a href='#' className='nav-link'>Pricing</a></li>
          <li className='nav-item'><a href='#' className='nav-link'>About</a></li>
          <li className='nav-item'><a href='#' className='nav-link'>Contact</a></li>
        </ul>
      </nav>
    </header>
  )
}

function MainContent() {
  return (
    <main>
      <h1>Fun facts about React</h1>

      <ul>
        <li>Was first released in 2013</li>
        <li>Was originally created by Jordan Walke</li>
        <li>Has well over 100K stars on GitHub</li>
        <li>Is maintained by Facebook</li>
        <li>Powers thousands of enterprise apps, including mobile apps</li>
      </ul>
    </main>
  )
}

function Footer() {
  return (
    <footer>
      <small>© 2021 Badrudeen development. All rights reserved.</small>
    </footer>
  )
}

export default App;
