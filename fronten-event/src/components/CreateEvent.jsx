import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/authcontext'
import axios from '../axios'
import { useNavigate } from 'react-router-dom'

const CreateEvent = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [capacity, setCapacity] = useState('')
    const [message, setMessage] = useState('')
    const { authTokens } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleCreateEvent = async (event) => {
        event.preventDefault()
        try{
            const eventData = {
                title : title,
                description : description,
                date : date,
                capacity : capacity
            }
            await axios.post('api/events/', eventData, {
                headers : {
                    Authorization : `Bearer ${authTokens.access}`
                }
            })
            setMessage('Event created successfully')
            setTitle('')
            setCapacity('')
            setDate('')
            setDescription('')
            navigate('/events')
        }catch(err){
            setMessage(err.response.data.message)
        }
    }
  return (
    <div className="max-w-md mx-auto my-10">
      <h2 className="text-2xl font-bold mb-5">Create Event</h2>
      <form onSubmit={handleCreateEvent}>
        <div className="mb-4">
          <label className="block mb-1">Title</label>
          <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} value={title} className="w-full p-2 border" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Description</label>
          <textarea name="description" onChange={(e) => setDescription(e.target.value)} value={description} className="w-full p-2 border" required></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Date</label>
          <input type="date" name="date" onChange={(e) => setDate(e.target.value)} value={date} className="w-full p-2 border" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Capacity</label>
          <input type="number" name="capacity" onChange={(e) => setCapacity(e.target.value)} value={capacity} className="w-full p-2 border" required />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2">Create Event</button>
      </form>
      {message && <p className="mt-5">{message}</p>}
    </div>
  )
}

export default CreateEvent