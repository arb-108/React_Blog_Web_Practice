import React from 'react'
import {  LogoutBtn } from '../index'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { HiBars3 } from "react-icons/hi2";
import { HiOutlineSearch } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from 'react';
import { NavLink } from 'react-router-dom';



const Header = () => {
    const [open, setOpen] = useState(false);
    const AuthStatus = useSelector(state => state.auth.status)
    const navigate = useNavigate()

    const navItems=[
        {
            name:'Home',
            slug:'/',
            active:true
        },
        {
            name:'Login',
            slug:'/login',
            active:!AuthStatus
        },
        {
            name:'Signup',
            slug:'/signup',
            active:!AuthStatus
        },
        {
            name:'Logout',
            slug:'/logout',
            active:AuthStatus
        },
        {
            name:'AllPosts',
            slug:'/allposts',
            active:AuthStatus
        }
        ,{
            name:'AddPost',
            slug:'/addpost',
            active:AuthStatus
        }
    ]
    const handleNavigation = (slug) => {
        navigate(slug);
        setOpen(false); 
    };


  return (
    <>
        <div className='relative flex  justify-between  p-1.5 items-center font-poppins  sm:shadow-lg px-3 h-[50px] sm:h-[70px]'>
            {open?<AiOutlineClose onClick={()=>setOpen(!open)} className='text-3xl sm:hidden'/>:<HiBars3 onClick={()=>setOpen(!open)} className='text-3xl sm:hidden'/> }
        <div className='text-[clamp(1.87rem,4vw,2rem)] cursor-pointer  sm:font-bold' >Costco</div>
        <div className={`absolute z-1 h-[calc(100vh-50px)] left-0 bottom-0 translate-y-full bg-gradient-to-t from-blue-200 to-slate-50 sm:bg-none w-screen sm:flex sm:w-auto sm:h-auto sm:static  sm:bottom-auto sm:translate-y-0  transition-all duration-600 ease-out ${open ? 'left-0' : 'left-[-640px]'}` }>
        <ul className='flex flex-col sm:flex sm:flex-row gap-[2vw] p-4'>
        {navItems.map((item,index)=>
            item.active?
            <li key={index} className='text-[clamp(1.5rem,3vw,2rem)]  sm:text-[#292929] relative hover:text-[#000] cursor-pointer underline-hover sm:text-[clamp(1rem,1vw,2rem)]'>
                <NavLink to={`${item.slug}`} className={({isActive})=>`${isActive ? "border-b-2 border-black text-black":""}`}>{item.name}</NavLink>
            </li>:null
            )}
            {AuthStatus &&
            <li className='text-[clamp(1.5rem,3vw,2rem)]  sm:text-[#292929] relative hover:text-[#000] cursor-pointer underline-hover sm:text-[clamp(1rem,1vw,2rem)]'>
            <LogoutBtn/>
            </li>
            }
        </ul>
            </div>
            <div className='md:relative md:flex  md:text-gray-400 md:border-1 md:border-gray-400 md:py-1 md:pl-1 md:rounded md:pr-4 md:focus-within:border-black md:focus-within:text-black'> 
            <input type="text" placeholder='Search here' className='hidden md:pl-1 md:block md:placeholder-gray-500 md:pr-4 md:focus:outline-none md:focus:ring-0'/>
            <HiOutlineSearch className='md:absolute md:right-0 text-2xl cursor-pointer md:pointer-events-none md:mr-1'/>
            </div>
        </div>
    </>
  )
  
}

export default Header