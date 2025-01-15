import { useState } from 'react'

import { DropdownList, NotFound, ListItemDetails, Search } from 'src/components'
import { InstitutionType } from 'src/types'

import './index.css'
import { LatLngExpression } from 'leaflet'

type Props = {
  data: InstitutionType[]
  isOpen: boolean
  onClickInstitution: (coord?: LatLngExpression) => void
}

export const DropdownMenu = ({ data, isOpen, onClickInstitution }: Props) => {
  const [search, setSearch] = useState<string>()
  const [selectedInstitution, setSelectedInstitution] =
    useState<InstitutionType>()

  const onSearch = (value?: string) => setSearch(value)
  const onSelect = (value?: InstitutionType) => {
    setSelectedInstitution(value)
    onClickInstitution(value?.coordinates)
  }
  const onClickBack = () => setSelectedInstitution(undefined)

  const filteredData = data?.filter((institution) =>
    search
      ? institution?.name?.toLowerCase().includes(search?.toLowerCase?.() || '')
      : institution?.name
  )

  return (
    <>
      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-menu-content">
            {!selectedInstitution && (
              <>
                <Search value={search} onChange={onSearch} />

                {filteredData?.length ? (
                  <DropdownList onSelect={onSelect} data={filteredData} />
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
