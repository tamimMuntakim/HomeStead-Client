import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './Routes/Router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='bg-[#e8f0ff]'>
      <RouterProvider router={router} />
    </div>
  </StrictMode>,
)
