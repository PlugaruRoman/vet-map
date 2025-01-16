import { MapViewType } from 'src/types'

import './index.css'

type Props = {
  activeView: MapViewType
  onChangeToggle: (value: MapViewType) => void
}

export const MapViewToggle = ({ activeView, onChangeToggle }: Props) => {
  return (
    <div className="map-view-toggle">
      <span
        onClick={() => onChangeToggle(MapViewType.MAP)}
        className={`map-view-toggle-item ${
          activeView === MapViewType.MAP ? 'map-view-toggle-item__active' : ''
        }`}
      >
        {MapViewType.MAP}
      </span>

      <div className="divider" />

      <span
        onClick={() => onChangeToggle(MapViewType.SATELLITE)}
        className={`map-view-toggle-item ${
          activeView === MapViewType.SATELLITE
            ? 'map-view-toggle-item__active'
            : ''
        }`}
      >
        {MapViewType.SATELLITE}
      </span>
    </div>
  )
}
