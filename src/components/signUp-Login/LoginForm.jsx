import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authservice from '../../appwrite/auth'
import { useDispatch } from 'react-redux'
import { login as Slicelogin } from '../../store/authSlice'
import { Controller, useForm } from 'react-hook-form'
import Input from '../Input'



const Login = () => {
    const [loginerrors, setloginerrors] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, control,formState: { errors },} = useForm()
    const loginSubmit= async (data) => {
        setloginerrors("")
        try {
            const user=await authservice.login({...data})
            if(user){
                const currUser=await authservice.currentUser()
                if(currUser){
                    dispatch(Slicelogin({userData:currUser}))
                    navigate("/")
                }
            }
            
        } catch (error) {
            setloginerrors(error.message)
        }
        
    }
  return (
    <div>
    <h1 className="text-2xl font-bold text-center">Sign-In</h1>
        <form onSubmit={handleSubmit(loginSubmit)} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{
          required: 'Email is required',
          pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email' },
        }}
        render={({ field }) => (
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={field.value}
            onChange={field.onChange}
            errors={errors}
            label="Email"
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={{
          required: 'Password is required',
        }}
        render={({ field }) => (
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={field.value}
            onChange={field.onChange}
            errors={errors}
            label="Password"
          />
        )}
      />
      <button
        type="submit"
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
    </div>
  )
}

export default Login