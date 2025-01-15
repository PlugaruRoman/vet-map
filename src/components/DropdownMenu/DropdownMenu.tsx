import { useState } from 'react'

import { DropdownList, NotFound, ListItemDetails, Search } from 'src/components'
import { InstitutionType } from 'src/types'

import './index.css'

type Props = {
  isOpen: boolean
}

export const DropdownMenu = ({ isOpen }: Props) => {
  const [search, setSearch] = useState<string>()
  const [selectedInstitution, setSelectedInstitution] =
    useState<InstitutionType>()

  const onSearch = (value?: string) => setSearch(value)
  const onSelect = (value?: InstitutionType) => setSelectedInstitution(value)

  return (
    <>
      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-menu-content">
            {!selectedInstitution && (
              <>
                <Search value={search} onChange={onSearch} />

                {!search?.length ? (
                  <DropdownList onSelect={onSelect} />
                ) : (
                  <NotFound />
                )}
              </>
            )}

            {selectedInstitution && (
              <ListItemDetails data={selectedInstitution} />
            )}
          </div>
        </div>
      )}
    </>
  )
}
