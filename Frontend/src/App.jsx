import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Chat from './pages/Chat'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/chat" Component={Chat} />
      </Routes>
    </div>
  );
}

export default App
