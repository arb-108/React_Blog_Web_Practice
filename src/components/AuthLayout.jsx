import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const AuthLayout = ({children,authentication=true}) => {
    const [loader, setloader] = useState(true)
    const navigate = useNavigate()
    const AuthStatus = useSelector(state => state.auth.status)
   useEffect(() => {
    if (authentication && !AuthStatus) {
        
        navigate('/login');
    } else if (!authentication && AuthStatus) {
        
        navigate('/');
    } else {
        
        setloader(false);
    }
   },[
    navigate,AuthStatus,authentication
   ]    )

   if (loader) {
    return <h1>Loading...</h1>;
    }

    return <div>
        <h1>Auth layout</h1>
        {children}
        </div>;
}

export default AuthLayout