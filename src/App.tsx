import { Outlet } from 'react-router-dom'
import './App.less'

export default () => {
  return (
    <div className="app">
      <Outlet />
    </div>
  )
}
