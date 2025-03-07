import React from 'react'
import authservice from "../../appwrite/auth"
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'


const LogoutBtn = () => {
    const dispatch = useDispatch()
    const handleLogout =()=>{
        authservice.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button onClick={handleLogout}
    className='"border-b-2 border-black text-black"'
    >Logout</button>
  )
}

export default LogoutBtn