import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SecondHero from './pages/secondHero'
import StudentRegister from './auth/student/StudentRegister'

function App() {

  return (
    <>
      <SecondHero/>
      <StudentRegister/>
    </>
  )
}

export default App
