import { useState, useRef, useMemo, useEffect } from 'react'
import { MapContainer, Marker, TileLayer, ZoomControl } from 'react-leaflet'
import { Icon, type LatLngExpression, type Map } from 'leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'

import {
  DropdownMenu,
  MapViewToggle,
  TabsBar,
  TabsBarMobile
} from 'src/components'
import { InstitutionType, MapTabsFilterType, MapViewType } from 'src/types'
import { onFilterData, onSearchData } from 'src/utils'

function App() {
  const mapRef = useRef<Map | null>(null)

  const [activeView, setActiveView] = useState(MapViewType.MAP)
  const [activeTab, setActiveTab] = useState(MapTabsFilterType.ALL_INSTITUTIONS)
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [search, setSearch] = useState<string>()
  const [institutions, setInstitutions] = useState<InstitutionType[]>([])
  const [selectedInstitution, setSelectedInstitution] =
    useState<InstitutionType>()

  const onChangeActiveView = (value: MapViewType) => setActiveView(value)
  const onChangeActiveTab = (value: MapTabsFilterType) => setActiveTab(value)
  const onSearch = (value?: string) => setSearch(value)

  const onSelectInstitution = (
    coord?: LatLngExpression,
    institution?: InstitutionType
  ) => {
    if (mapRef.current) {
      const map = mapRef.current
      map.flyTo(coord as LatLngExpression, 16, {
        duration: 3
      })
    }
    setIsOpenMenu(true)
    setSelectedInstitution(institution)
  }

  const createMarkerIcon = (color: string) => {
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none">
      <g clip-path="url(#clip0_18_4207)">
        <path d="M20.6201 8.45C19.5701 3.83 15.5401 1.75 12.0001 1.75C12.0001 1.75 12.0001 1.75 11.9901 1.75C8.4601 1.75 4.4201 3.82 3.3701 8.44C2.2001 13.6 5.3601 17.97 8.2201 20.72C9.2801 21.74 10.6401 22.25 12.0001 22.25C13.3601 22.25 14.7201 21.74 15.7701 20.72C18.6301 17.97 21.7901 13.61 20.6201 8.45ZM12.0001 13.46C10.2601 13.46 8.8501 12.05 8.8501 10.31C8.8501 8.57 10.2601 7.16 12.0001 7.16C13.7401 7.16 15.1501 8.57 15.1501 10.31C15.1501 12.05 13.7401 13.46 12.0001 13.46Z" fill="${color}"/>
      </g>
      <defs>
        <clipPath id="clip0_18_4207">
          <rect width="22" height="22" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  `
    return new Icon({
      iconUrl: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`,
      iconSize: [42, 42],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    })
  }

  const primaryColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--primary-color')
    .trim()

  const customIcon = createMarkerIcon(primaryColor)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:80/api/v1/institutions/')
        const data = await response.json()
        setInstitutions(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const filteredData = useMemo(() => {
    if (
      !search &&
      (!activeTab || activeTab === MapTabsFilterType.ALL_INSTITUTIONS)
    ) {
      return institutions
    }

    let result = institutions
    if (search) result = onSearchData(result, search)
    if (activeTab && activeTab !== MapTabsFilterType.ALL_INSTITUTIONS) {
      result = onFilterData(result, activeTab)
    }
    return result
  }, [search, institutions, activeTab])

  return (
    <>
      <MapViewToggle
        activeView={activeView}
        onChangeToggle={onChangeActiveView}
      />

      <DropdownMenu
        search={search}
        onSearch={onSearch}
        data={filteredData as InstitutionType[]}
        isOpen={isOpenMenu}
        selectedInstitution={selectedInstitution}
        onClickInstitution={onSelectInstitution}
      />

      <TabsBarMobile
        activeTab={activeTab}
        isOpenMenu={isOpenMenu}
        onChangeActiveTab={onChangeActiveTab}
        onClickMenuButton={setIsOpenMenu}
      />

      <TabsBar
        activeTab={activeTab}
        isOpenMenu={isOpenMenu}
        onChangeActiveTab={onChangeActiveTab}
        onClickMenuButton={setIsOpenMenu}
      />

      {institutions?.[0]?.coordinates && (
        <MapContainer
          className="map-container"
          ref={mapRef}
          center={
            (institutions?.[0]?.coordinates as number[])?.map(
              (coord) => +coord
            ) as LatLngExpression
          }
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

          <MarkerClusterGroup>
            {filteredData?.map((institution) => (
              <Marker
                key={institution?.id}
                icon={customIcon}
                position={institution?.coordinates}
                eventHandlers={{
                  click: () => {
                    onSelectInstitution(institution?.coordinates, institution)
                  }
                }}
              />
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      )}
    </>
  )
}

export default App
