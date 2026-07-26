import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import { useSelector } from "react-redux";
import { Loader } from 'lucide-react'
import Login from './Login'

const Layout = () => {

  const {user,loading}=useSelector(state=>state.auth)
  if(loading){
    return <Loader/>
  }
  return (
    <div>
      {
        user ? (<div className='bg-[#050816] min-h-screen'>
        <Navbar/>
        <Outlet/>
        </div>)
        : <Login/>
      }
        
    </div>
  )
}

export default Layout