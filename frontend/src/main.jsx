import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import './index.css'
import SecondHero from './pages/secondHero.jsx';
import StudentRegister from './auth/student/StudentRegister.jsx';
import Notfound from './pages/NotFound.jsx';
import App from './App.jsx'

const Routes = createBrowserRouter([
  {
    path : '/',
    element : <SecondHero/>,
    errorElement : <Notfound/>
  },
  {
    path : '/student-register',
    element : <StudentRegister/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {Routes} />
  </StrictMode>,
)
