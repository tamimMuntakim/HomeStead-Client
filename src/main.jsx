import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import router from './Routes/Router';
import AuthProvider from "./Providers/AuthProvider";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='bg-[#e8f0ff]'>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  </StrictMode>
)
