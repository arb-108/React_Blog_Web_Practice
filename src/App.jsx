import { use, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authservice from './appwrite/auth'
import { login, logout } from './store/authSlice.js'
import './App.css'
import { Header,Footer } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authservice.currentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    }).finally(() => setLoading(false))
  }, [])


  return !loading ? (
    <div>
      <Header />
      <main>
        <Outlet/>
        {/* <h2>Hello testing</h2> */}
        
      </main>
      <Footer/>
    </div>
  ):null
}

export default App
