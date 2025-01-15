import { useState, useRef } from 'react'
import { MapContainer, Marker, TileLayer, ZoomControl } from 'react-leaflet'
import { Icon, type LatLngExpression, type Map } from 'leaflet'

import { DropdownMenu, MapViewToggle, TabsBar } from 'src/components'
import { MapTabsFilterType, MapViewType } from 'src/types'

import MarkerIcon from '/location.svg'

const position: LatLngExpression = [52.51, 13.38]
const defaultCenter: LatLngExpression = [55.51, 73.38]

const customIcon = new Icon({
  iconUrl: MarkerIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
})

function App() {
  const mapRef = useRef<Map | null>(null)

  const [activeView, setActiveView] = useState(MapViewType.MAP)
  const [activeTab, setActiveTab] = useState(MapTabsFilterType.ALL_INSTITUTIONS)
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  const onChangeActiveView = (value: MapViewType) => setActiveView(value)
  const onChangeActiveTab = (value: MapTabsFilterType) => setActiveTab(value)

  const handleButtonClick = () => {
    if (mapRef.current) {
      const map = mapRef.current
      map.flyTo(defaultCenter, 14, {
        duration: 3
      })
    }
  }

  return (
    <div>
      <MapViewToggle
        activeView={activeView}
        onChangeToggle={onChangeActiveView}
      />

      <TabsBar
        activeTab={activeTab}
        isOpenMenu={isOpenMenu}
        onChangeActiveTab={onChangeActiveTab}
        onClickMenuButton={setIsOpenMenu}
      />

      <DropdownMenu isOpen={isOpenMenu} />

      <MapContainer
        className="map-container"
        ref={mapRef}
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <ZoomControl position="bottomright" />

        {activeView === MapViewType.MAP ? (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        ) : (
          <TileLayer
            attribution="Imagery © Esri"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        )}

        <Marker icon={customIcon} position={position} />
      </MapContainer>
    </div>
  )
}

export default App
