import { LeftArrow } from 'src/assets'

import './index.css'
import { Button } from '../Button'
import { useState } from 'react'
import { DetailsType, InstitutionType } from 'src/types'

type Props = {
  data?: InstitutionType
}

export const ListItemDetails = ({ data }: Props) => {
  const [activeDetailType, setActiveDetailType] = useState(DetailsType.DETAILS)

  const onChangeDetailType = (value: DetailsType) => setActiveDetailType(value)

  return (
    <>
      <button className="details-item-button">
        <LeftArrow />

        <div>Înapoi</div>
      </button>

      <div className="tag-item">Centre de excelenţă</div>

      <p>{data?.name}</p>

      <div className="details-item-tabs">
        {Object.values(DetailsType).map((type) => (
          <Button
            onClick={() => onChangeDetailType(type)}
            className={
              activeDetailType === type
                ? 'button__active w-full'
                : 'button w-full'
            }
          >
            {type}
          </Button>
        ))}
      </div>

      <div className="details-item">
        <div className="details-item-label">Autoritatea fondatoare</div>

        <div className="details-item-value">{data?.founding_authority}</div>
      </div>

      <div className="details-item">
        <div className="details-item-label">Specializarea instituției</div>

        <div className="details-item-value">
          {data?.institution_specialization}
        </div>
      </div>

      <div className="details-item">
        <div className="details-item-label">Adresa fizică a instituției</div>

        <div className="details-item-value">{data?.physical_address}</div>
      </div>

      <div className="details-item">
        <div className="details-item-label">Siteul instituției</div>

        <a href="www.ceiti.md" target="_blank">
          {data?.url}
        </a>
      </div>

      <div className="details-item">
        <div className="details-item-label">Adresa mail a instituției</div>

        <div className="details-item-value">{data?.email}</div>
      </div>

      <div className="details-item">
        <div className="details-item-label">Telefonul de contact</div>

        <div className="details-item-value">{data?.contact_phone}</div>
      </div>
    </>
  )
}
