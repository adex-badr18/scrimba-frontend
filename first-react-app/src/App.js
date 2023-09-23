import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
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

export default App;
