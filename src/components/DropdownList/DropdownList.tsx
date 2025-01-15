import { InstitutionType } from 'src/types'

import './index.css'

type Props = {
  onSelect: (value: InstitutionType) => void
}

export const DropdownList = ({ onSelect }: Props) => {
  return (
    <ul className="dropdown-list">
      <li
        className="dropdown-list-item"
        onClick={() =>
          onSelect({
            id: 1,
            category: 'Centre de excelenţă',
            name: 'I. P. Centrul de excelenţă în informatică şi tehnologii informaţionale din Chișinău',
            founding_authority: 'Ministerul Educației și Cercetării',
            institution_specialization: 'Domeniul TIC',
            physical_address: 'mun. Chişinău, str. Sarmizegetusa, nr. 48',
            url: 'https://www.youtube.com/',
            email: 'secretariat@ceiti.md',
            contact_phone: '022 523 001068 654 320 - Andrei Ciobanu, Director '
          })
        }
      >
        <span className="tag-item">Centre de excelenţă</span>

        <p className="dropdown-list-item-title">
          I. P. Centrul de excelenţă în informatică şi tehnologii informaţionale
          din Chișinău
        </p>

        <span className="dropdown-list-item-address">
          mun. Chişinău, str. Sarmizegetusa, nr. 48
        </span>
      </li>
    </ul>
  )
}
