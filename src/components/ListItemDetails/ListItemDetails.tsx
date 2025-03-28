import { useState } from 'react'
import { Button, Put } from 'src/components'
import { LeftArrow } from 'src/assets'
import { DetailsType, InstitutionType } from 'src/types'

import './index.css'

type Props = {
  data?: InstitutionType
  onClickBack: (institution?: InstitutionType) => void
}

export const ListItemDetails = ({ data, onClickBack }: Props) => {
  const [activeDetailType, setActiveDetailType] = useState(DetailsType.DETAILS)

  const onChangeDetailType = (value: DetailsType) => setActiveDetailType(value)
  console.log(data?.description)
  return (
    <>
      <button onClick={() => onClickBack(data)} className="details-item-button">
        <LeftArrow />

        <div>Înapoi</div>
      </button>

      <div className="tag-item">{data?.type}</div>

      <p className="details-item-name">{data?.name}</p>

      <div className="details-item-tabs">
        {Object.values(DetailsType).map((type) => (
          <Button
            key={type}
            onClick={() => onChangeDetailType(type)}
            block
            className={`button button__block ${
              activeDetailType === type ? 'button__active' : ''
            }`}
          >
            {type}
          </Button>
        ))}
      </div>

      {activeDetailType === DetailsType.DETAILS ? (
        <>
          <div className="details-item">
            <div className="details-item-label">Autoritatea fondatoare</div>

            <Put className="details-item-value">{data?.founding_authority}</Put>
          </div>
          <div className="details-item">
            <div className="details-item-label">Specializarea instituției</div>

            <Put className="details-item-value">{data?.summary}</Put>
          </div>
          <div className="details-item">
            <div className="details-item-label">
              Adresa fizică a instituției
            </div>

            <Put className="details-item-value">{data?.physical_address}</Put>
          </div>
          <div className="details-item">
            <div className="details-item-label">Site-ul instituției</div>

            <Put>
              {data?.website && (
                <a href={data?.website} target="_blank">
                  {data?.website}
                </a>
              )}
            </Put>
          </div>
          <div className="details-item">
            <div className="details-item-label">
              Adresa de e-mail a instituției
            </div>

            <Put className="details-item-value">{data?.email}</Put>
          </div>
          <div className="details-item">
            <div className="details-item-label">Telefonul de contact</div>

            <Put className="details-item-value">{data?.phone}</Put>
          </div>
        </>
      ) : (
        <div
          dangerouslySetInnerHTML={{
            __html: data?.description?.replace?.(/\n/g, '<br>') || ''
          }}
        />
      )}
    </>
  )
}
