import React from 'react'
import ReactDOM from 'react-dom/client'
import Jovens from './pages/Jovens.jsx'
import Adolescentes from './pages/Adolescentes.jsx'
import './styles/styles.css'

const pathname = window.location.pathname;
const root = ReactDOM.createRoot(document.getElementById('root'));

if (pathname.includes('adolescentes')) {
  root.render(
    <React.StrictMode>
      <Adolescentes />
    </React.StrictMode>
  );
} else {
  root.render(
    <React.StrictMode>
      <Jovens />
    </React.StrictMode>
  );
}