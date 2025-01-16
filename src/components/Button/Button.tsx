import { PropsWithChildren, ReactElement } from 'react'

import './index.css'

type Props = {
  className?: string
  icon?: ReactElement
  block?: boolean
  onClick: () => void
} & PropsWithChildren

export const Button = ({ children, icon, block, ...props }: Props) => {
  return (
    <button className={`button ${block ? 'button__block' : ''}`} {...props}>
      {children}

      {icon}
    </button>
  )
}
