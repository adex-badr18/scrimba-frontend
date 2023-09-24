import reactLogo from '../assets/react.svg'

export default function Navbar() {
    return (
        <header>
            <nav>
                <img src={reactLogo} className='logo-img' alt="Logo" />
                <h3 className='logo-text'>ReactFacts</h3>
                <h4 className='course-title'>React Course - Project 1</h4>
            </nav>
        </header>
    )
}