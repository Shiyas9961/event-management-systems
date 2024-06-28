import { useNavigate } from 'react-router-dom'
import axios from '../axios'
import React, { useState } from 'react'

const Register = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [otp, setOtp] = useState('')
    const [step, setStep] = useState(1)
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
            if (step === 1) {
                const userData = {
                    username : username,
                    email : email,
                    password : password
                }
                const response = await axios.post('api/account/register/', userData)
                setMessage(response.data.message)
                setStep(2)
            }else{
                const userData = {
                    email : email,
                    otp : otp
                }
                await axios.post('api/account/verify-otp/', userData, )
                setMessage("User verified successfully")
                setStep(1)
                navigate('/login')
            }
        }catch(err){
            setMessage(err.response.data.message)
        }
    }


  return (

    <div className="max-w-md mx-auto my-10">
      <h2 className="text-2xl font-bold mb-5">Register</h2>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <div className="mb-4">
              <label className="block mb-1">Username</label>
              <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} value={username} className="w-full p-2 border" required />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Email</label>
              <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} className="w-full p-2 border" required />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Password</label>
              <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} className="w-full p-2 border" required />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2">Register</button>
          </>
        )}
        {step === 2 && (
          <>
            <div className="mb-4">
              <label className="block mb-1">OTP</label>
              <input type="text" name="otp" onChange={(e) => setOtp(e.target.value)} value={otp} className="w-full p-2 border" required />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2">Verify OTP</button>
          </>
        )}
      </form>
      {message && <p className="mt-5">{message}</p>}
    </div>
  )
}

export default Register