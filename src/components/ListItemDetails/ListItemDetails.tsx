import { LeftArrow } from 'src/assets'

import './index.css'
import { Button } from '../Button'
import { useState } from 'react'
import { DetailsType, InstitutionType } from 'src/types'

type Props = {
  data?: InstitutionType
  onClickBack: () => void
}

export const ListItemDetails = ({ data, onClickBack }: Props) => {
  const [activeDetailType, setActiveDetailType] = useState(DetailsType.DETAILS)

  const onChangeDetailType = (value: DetailsType) => setActiveDetailType(value)

  return (
    <>
      <button onClick={onClickBack} className="details-item-button">
        <LeftArrow />

        <div>Înapoi</div>
      </button>

      <div className="tag-item">Centre de excelenţă</div>

      <p className="details-item-name">{data?.name}</p>

      <div className="details-item-tabs">
        {Object.values(DetailsType).map((type) => (
          <Button
            key={type}
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

      {activeDetailType === DetailsType.DETAILS ? (
        <>
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
            <div className="details-item-label">
              Adresa fizică a instituției
            </div>

            <div className="details-item-value">{data?.physical_address}</div>
          </div>
          <div className="details-item">
            <div className="details-item-label">Siteul instituției</div>

            <a href={data?.url} target="_blank">
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
      ) : (
        <>
          <h4 className="information-list-title">Specialități</h4>
          <ul className="information-list">
            <li>Administrarea aplicațiilor web</li>
            <li>Programarea și analiza produselor program</li>
            <li>Administrarea bazelor de date</li>
            <li>Rețele de calculatoare</li>
            <li>Contabilitate Jurisprudență</li>
            <li>Servicii administrative și de secretariat</li>
            <li>Operator pentru suportul tehnic al calculatoarelor</li>
          </ul>

          <h4 className="information-list-title">Meserii</h4>
          <ul className="information-list ">
            <li>Operator pentru suportul tehnic al calculatoarelor</li>
            <li>Operator introducere, validare și prelucrare date</li>
          </ul>
        </>
      )}
    </>
  )
}
