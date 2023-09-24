import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Main from './components/Main'

function App() {
  return (
    <div className='container'>
      <Navbar />
      <Main />
    </div>
  )
}

export default App
