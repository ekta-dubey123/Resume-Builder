import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {logout} from '../app/features/authSlice'

const Navbar = () => {
    const {user}=useSelector(state=>state.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const logoutUser=()=>{
        navigate('/')
        dispatch(logout())
    }


  return (
    <div className="bg-[#050816] text-white p-4">
        <nav className="container mx-auto flex items-center justify-between">
            <Link to="/">

            <img src="image.png" alt="Logo" className="h-22 w-22 mr-2" />
            
            </Link>
            <div className="flex items-center gap-4">
                <p className="text-lg font-medium">Hi, {user?.name}</p>
                <button onClick={logoutUser}className="bg-[#9BFF4F] text-[#0b1020] font-bold py-2 px-4 rounded-xl">
                    Logout
                </button>
            </div>
        </nav>
    </div>
  )
}

export default Navbar