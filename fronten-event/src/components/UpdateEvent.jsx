import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../context/authcontext'
import axios from '../axios'

const UpdateEvent = () => {
    const { id } = useParams()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [capacity, setCapacity] = useState('')
    const [message, setMessage] = useState('')
    const { authTokens } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        const getEventById = async () => {
            try{

                const response = await axios.get(`api/events/${id}/`, {
                    headers : {
                        Authorization : `Bearer ${authTokens.access}`
                    }
                })
                setDescription(response.data.description)
                setDate(response.data.date)
                setTitle(response.data.title)
                setCapacity(response.data.capacity)
            }catch(err){

            }
        }
        getEventById()
    },[id, authTokens])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const eventData = {
                title : title,
                description : description,
                date : date,
                capacity : capacity
            }
          await axios.put(`/api/events/${id}/`, eventData, {
            headers: {
              Authorization: `Bearer ${authTokens.access}`,
            },
          });
          setMessage('Event updated successfully');
          navigate('/events')
        } catch (error) {
          setMessage('Error updating event');
        }
      };

  return (
    <div className="max-w-md mx-auto my-10">
      <h2 className="text-2xl font-bold mb-5">Update Event</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="w-full bg-blue-500 text-white p-2">Update Event</button>
      </form>
      {message && <p className="mt-5">{message}</p>}
    </div>
  )
}

export default UpdateEvent