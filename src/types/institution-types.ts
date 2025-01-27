import { LatLngExpression } from 'leaflet'

export type InstitutionType = {
  id: number
  coordinates: LatLngExpression
  name: string
  type: string
  founding_authority: string
  physical_address: string
  email: string
  website: string
  phone: string
  summary: string
  description: string
}
