import { useState } from 'react'
import type { LatLngExpression } from 'leaflet'
import { DropdownList, NotFound, ListItemDetails, Search } from 'src/components'
import { InstitutionType } from 'src/types'

import './index.css'

type Props = {
  search?: string
  data: InstitutionType[]
  isOpen: boolean
  onSearch: (value?: string) => void
  onClickInstitution: (coord?: LatLngExpression) => void
}

export const DropdownMenu = ({
  data,
  search,
  isOpen,
  onSearch,
  onClickInstitution
}: Props) => {
  const [selectedInstitution, setSelectedInstitution] =
    useState<InstitutionType>()

  const onSelect = (value?: InstitutionType) => {
    setSelectedInstitution(value)
    onClickInstitution(value?.coordinates)
  }
  const onClickBack = () => setSelectedInstitution(undefined)

  return (
    <>
      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-menu-content">
            {!selectedInstitution && (
              <>
                <Search value={search} onChange={onSearch} />

                {data?.length ? (
                  <DropdownList onSelect={onSelect} data={data} />
                ) : (
                  <NotFound />
                )}
              </>
            )}

            {selectedInstitution && (
              <ListItemDetails
                onClickBack={onClickBack}
                data={selectedInstitution}
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}
