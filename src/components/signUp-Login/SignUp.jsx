import React, { useState } from 'react'
import authservice from '../../appwrite/auth'
import { useDispatch } from 'react-redux'
import { login } from '../../store/authSlice'
import { Controller, useForm} from 'react-hook-form'
import Input from '../Input'


const SignUp = () => {
    const [signupError, setsignupError] = useState("")
    const { register, handleSubmit, control, formState: { errors }, } = useForm()

    const dispatch = useDispatch()
    const onSubmit = async (data) => {
        setsignupError("")
        try {
            const user = await authservice.createAccount({...data})
            if (user) {
                const currUser = await authservice.currentUser()
                if (currUser) {
                    dispatch(login({ userData: currUser }))
                    navigate("/")
                }

            }
        } catch (error) {
            setsignupError(error.message)
        }
    }

  return (
    <div>
        <h1 className="text-2xl font-bold text-center">Sign-Up</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{
                required: 'Name is required',
            }}
            render={({ field }) => (
                <Input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={field.value}
                onChange={field.onChange}
                errors={errors}
                label="Name"
                />
            )}
            />
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
                minLength: { value: 6, message: 'Password must have at least 6 characters' },
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
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign Up</button>
            {signupError && <p className="text-red-500 text-center">{signupError}</p>}
        </form>
    </div>
  )
}

export default SignUp