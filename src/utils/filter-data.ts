import { InstitutionType, MapTabsFilterType } from 'src/types'

export const onSearchData = (data: InstitutionType[], search: string) =>
  data?.filter((institution) =>
    removeDiacritics(institution?.name)
      .toLowerCase()
      .includes(removeDiacritics(search).toLowerCase())
  )

const removeDiacritics = (str: string = '') =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

export const onFilterData = (
  data: InstitutionType[],
  filter: MapTabsFilterType
) => data?.filter((institution) => institution?.type === filter)
