import { Button } from 'src/components'

import { LayerIcon } from 'src/assets'

import { MapTabsFilterType } from 'src/types'

import './index.css'

type Props = {
  activeTab?: MapTabsFilterType
  isOpenMenu?: boolean
  onChangeActiveTab: (value: MapTabsFilterType) => void
  onClickMenuButton: React.Dispatch<React.SetStateAction<boolean>>
}

export const TabsBar = ({
  activeTab,
  isOpenMenu,
  onChangeActiveTab,
  onClickMenuButton
}: Props) => {
  return (
    <div className="tabs-bar">
      <Button
        onClick={() => onClickMenuButton((prev) => !prev)}
        className={isOpenMenu ? 'button__active' : 'button'}
      >
        <LayerIcon />
      </Button>

      {Object.values(MapTabsFilterType).map((type) => (
        <Button
          key={type}
          onClick={() => onChangeActiveTab(type)}
          className={activeTab === type ? 'button__active' : 'button'}
        >
          {type}
        </Button>
      ))}
    </div>
  )
}
