import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import EasterEgg from './components/EasterEgg.jsx'
import NotFoundPage from './components/NotFoundPage.jsx'

const router = createBrowserRouter([
  {path:"/", element:<App />},
  {path:"/easteregg", element: <EasterEgg />},
  {path:"*", element: <NotFoundPage />}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
