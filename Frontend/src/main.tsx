import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import BeginPage from './pages/BeginPage.tsx'
import AdminPage from './pages/AdminPage.tsx'
import VluchtPage from './pages/VluchtPage.tsx'
import RekeningPage from './pages/RekeningPage.tsx'
import VliegtuigPage from './pages/VliegtuigPage.tsx'

const browserRouter = createBrowserRouter([
  {
      path: "/",
      element: <BeginPage></BeginPage>,
      
  },
  {
      path: "/AdminPage",
      element: <AdminPage></AdminPage>
  },
  {
    path: "/VluchtPage",
    element: <VluchtPage></VluchtPage>
  },
  {
    path: "/RekeningPage",
    element: <RekeningPage></RekeningPage>
  },
  {path: "/VliegtuigPage",
  element: <VliegtuigPage></VliegtuigPage>
  }
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={browserRouter}></RouterProvider>
  </StrictMode>,
)
