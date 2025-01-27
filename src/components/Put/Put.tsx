import { PropsWithChildren } from 'react'

type Props = {
  className?: string
} & PropsWithChildren

export const Put = ({ children, ...props }: Props) => {
  return <div {...props}>{children || '-'}</div>
}
