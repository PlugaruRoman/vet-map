import { PropsWithChildren } from 'react'
import './index.css'

type Props = {
  onClick: () => void
  className?: string
} & PropsWithChildren

export const Button = ({ children, ...props }: Props) => {
  return (
    <button className="button" {...props}>
      {children}
    </button>
  )
}
