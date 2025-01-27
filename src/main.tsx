import { createRoot } from 'react-dom/client'
import App from 'src/App'

import 'leaflet/dist/leaflet.css'
import 'react-leaflet-markercluster/styles'

import './index.css'
import './palette.css'
import './variable.css'

createRoot(document.getElementById('map-widget')!).render(<App />)
