import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'App'
import './index.css'
import "mapbox-gl/dist/mapbox-gl.css";


// const title = import.meta.env.VITE_APP_TITLE
console.dir(import.meta.env)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
