import { createBrowserRouter } from 'react-router-dom'
import App from '@/App.tsx'
import Home from '@/pages/Home'

export const pages = [
  {
    text: 'Dashboard',
    path: '/',
    element: <Home />
  }
]

export const routes = [
  {
    path: '',
    element: <App />,
    children: [...pages]
  }
]

export default createBrowserRouter(routes)
