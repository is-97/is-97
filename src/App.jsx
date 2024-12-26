import { useState } from 'react'
import Chat from './components/Chat'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>AI 助手</h1>
      </header>
      <main>
        <Chat />
      </main>
    </div>
  )
}

export default App
