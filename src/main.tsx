import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Context from '../src/AppContext/Context.tsx'
import 'flowbite';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Context>
    <App />
    </Context>
  </React.StrictMode>,
)
