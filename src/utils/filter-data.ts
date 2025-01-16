import { InstitutionType, MapTabsFilterType } from 'src/types'

export const onSearchData = (data: InstitutionType[], search: string) =>
  data?.filter((institution) =>
    institution?.name?.toLowerCase().includes(search?.toLowerCase?.())
  )

export const onFilterData = (
  data: InstitutionType[],
  filter: MapTabsFilterType
) => data?.filter((institution) => institution?.category === filter)
