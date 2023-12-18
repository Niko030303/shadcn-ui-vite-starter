import { ReactNode } from 'react'

interface propsType {
  children?: ReactNode
}

export default ({ children }: propsType) => {
  return <div >{children}</div>
}
