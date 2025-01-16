import { useState } from 'react'
import { Button } from 'src/components'
import { ArrowDown, LayerIcon } from 'src/assets'
import { MapTabsFilterType } from 'src/types'
import './index.css'

type Props = {
  activeTab: MapTabsFilterType
  isOpenMenu?: boolean
  onChangeActiveTab: (value: MapTabsFilterType) => void
  onClickMenuButton: React.Dispatch<React.SetStateAction<boolean>>
}

export const TabsBarMobile = ({
  activeTab,
  isOpenMenu,
  onChangeActiveTab,
  onClickMenuButton
}: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <div className="tabs-bar-mobile">
      <Button
        onClick={() => onClickMenuButton((prev) => !prev)}
        className={isOpenMenu ? 'button__active' : 'button'}
      >
        <LayerIcon />
      </Button>

      <div className="custom-dropdown">
        <Button
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          icon={<ArrowDown />}
          className="button w-full"
        >
          {activeTab}
        </Button>

        {isDropdownOpen && (
          <div className="custom-dropdown-options">
            {Object.values(MapTabsFilterType).map((type) => (
              <Button
                key={type}
                className={activeTab === type ? 'button__active' : 'button'}
                onClick={() => {
                  onChangeActiveTab(type)
                  setIsDropdownOpen(false)
                }}
              >
                {type}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
