import { useState } from 'react'
import { Search } from '../Search'

import './index.css'
import { DropdownList } from '../DropdownList'
import { NotFound } from '../NotFound'

type Props = {
  isOpen: boolean
}

export const DropdownMenu = ({ isOpen }: Props) => {
  const [search, setSearch] = useState<string>()

  const onSearch = (value?: string) => setSearch(value)

  return (
    <>
      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-menu-content">
            <Search value={search} onChange={onSearch} />

            {/* <DropdownList /> */}

            <NotFound />
          </div>
        </div>
      )}
    </>
  )
}
