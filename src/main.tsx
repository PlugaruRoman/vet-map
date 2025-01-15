import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from 'src/App'

import 'leaflet/dist/leaflet.css'
import 'react-leaflet-markercluster/styles'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
