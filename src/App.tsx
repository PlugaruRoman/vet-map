import { useState, useRef } from 'react'
import { MapContainer, Marker, TileLayer, ZoomControl } from 'react-leaflet'
import { Icon, type LatLngExpression, type Map } from 'leaflet'

import { DropdownMenu, MapViewToggle, TabsBar } from 'src/components'
import { InstitutionType, MapTabsFilterType, MapViewType } from 'src/types'

import MarkerIcon from '/location.svg'
import { institutions } from './data'

const customIcon = new Icon({
  iconUrl: MarkerIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
})

function App() {
  const mapRef = useRef<Map | null>(null)

  const defaultCenter = institutions?.[0]?.coordinates

  const [activeView, setActiveView] = useState(MapViewType.MAP)
  const [activeTab, setActiveTab] = useState(MapTabsFilterType.ALL_INSTITUTIONS)
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  const onChangeActiveView = (value: MapViewType) => setActiveView(value)
  const onChangeActiveTab = (value: MapTabsFilterType) => setActiveTab(value)

  const handleButtonClick = (coord?: LatLngExpression) => {
    if (mapRef.current) {
      const map = mapRef.current
      map.flyTo(coord as LatLngExpression, 14, {
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

      <DropdownMenu
        data={institutions as InstitutionType[]}
        isOpen={isOpenMenu}
        onClickInstitution={handleButtonClick}
      />

      <MapContainer
        className="map-container"
        ref={mapRef}
        center={defaultCenter as LatLngExpression}
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

        {institutions.map((institution) => (
          <Marker
            key={institution.id}
            icon={customIcon}
            position={institution.coordinates as LatLngExpression}
          />
        ))}
      </MapContainer>
    </div>
  )
}

export default App
