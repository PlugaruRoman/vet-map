import { PropsWithChildren, ReactElement } from 'react'
import './index.css'

type Props = {
  className?: string
  icon?: ReactElement
  onClick: () => void
} & PropsWithChildren

export const Button = ({ children, icon, ...props }: Props) => {
  return (
    <button className="button" {...props}>
      {children}
      {icon}
    </button>
  )
}
