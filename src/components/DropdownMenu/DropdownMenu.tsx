import { LatLngExpression } from 'leaflet'
import { DropdownList, NotFound, ListItemDetails, Search } from 'src/components'
import { InstitutionType } from 'src/types'

import './index.css'

type Props = {
  search?: string
  data: InstitutionType[]
  isOpen: boolean
  selectedInstitution?: InstitutionType
  onSearch: (value?: string) => void
  onClickInstitution: (
    coord?: LatLngExpression,
    institution?: InstitutionType
  ) => void
}

export const DropdownMenu = ({
  data,
  search,
  isOpen,
  selectedInstitution,
  onSearch,
  onClickInstitution
}: Props) => {
  const onSelect = (institution?: InstitutionType) =>
    onClickInstitution(institution?.coordinates, institution)

  const onClickBack = (institution?: InstitutionType) =>
    onClickInstitution(institution?.coordinates, undefined)

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
