import { InstitutionType } from 'src/types'
import { LocationSmall } from 'src/assets'

import './index.css'

type Props = {
  data: InstitutionType[]
  onSelect: (value: InstitutionType) => void
}

export const DropdownList = ({ data, onSelect }: Props) => {
  return (
    <ul className="dropdown-list">
      {data?.map((institution) => (
        <li
          key={institution.id}
          className="dropdown-list-item"
          onClick={() => onSelect(institution)}
        >
          <span className="tag-item">{institution?.type}</span>

          <p className="dropdown-list-item-title">{institution?.name}</p>

          <div className="dropdown-list-item-address-container">
            <LocationSmall />

            <div className="dropdown-list-item-address">
              {institution?.physical_address}
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
