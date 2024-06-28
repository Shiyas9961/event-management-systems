import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/authcontext'
import { Link } from 'react-router-dom'


const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const { login } = useContext(AuthContext)

    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
          login(username, password)
        }catch(err) {
          setMessage(err.response.data.message)
        }
        
    }
  return (
    <div className="max-w-md mx-auto my-10">
      <h2 className="text-2xl font-bold mb-5">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} value={username} className="w-full p-2 border" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} className="w-full p-2 border" required />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2">Login</button>
      </form>
      <p className="mt-3">
        Don't have an account? <Link to="/register" className="text-blue-500">Register here</Link>
      </p>
      {message && <p className="mt-5">{message}</p>}
    </div>
  )
}

export default Login