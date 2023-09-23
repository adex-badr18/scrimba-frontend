import logo from '../../logo.svg';

export default function Header() {
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