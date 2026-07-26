import React from 'react'
import { Route,Routes } from 'react-router-dom'
import ResumeBuilder from './Pages/ResumeBuilder'
import Preview from './Pages/Preview'
import Home from './Pages/Home'
import Layout from './Pages/Layout'
import Dashboard from './Pages/Dashboard'
import Login from './Pages/Login'

const App = () => {
  return (
   <>
   <Routes>
    <Route path='/' element={<Home />} />
    
    <Route path='app' element={<Layout />}>
      <Route index element={<Dashboard />} />
      <Route path='builder/:resumeID' element={<ResumeBuilder />} />
    </Route>


     <Route path='view/:resumeID' element={<Preview />} />
     <Route path='login' element={<Login />} />

    
  


   </Routes>
   </>
  )
}

export default App