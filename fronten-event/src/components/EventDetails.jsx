import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { AuthContext } from '../context/authcontext'
import axios from '../axios'

const EventDetails = () => {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [message, setMessage] = useState('')
  const { authTokens } = useContext(AuthContext)

  useEffect(() => {
    const getSingleEvent = async () => {
      try{
        const response = await axios.get(`api/events/${id}/`, {
          headers : {
            Authorization : `Bearer ${authTokens.access}`
          }
        })
        const data = response.data
        setEvent(data)
      }catch(err){
        setMessage(err.response.data.message)
      }
    }

    getSingleEvent()
  }, [id, authTokens])

  const handleRsgistration = async (event) => {
    event.preventDefault()
    try{
      const response = await axios.post(`api/events/${id}/register/`, {}, {
        headers : {
          Authorization : `Bearer ${authTokens.access}`
        }
      })
      setMessage(response.data.message)
    }catch(err){
      setMessage(err.response.data.message)
    }
  }

  if (!event) {
    return (
      <div>Loading...</div>
    )
  }
  return (
    <div className="max-w-4xl mx-auto my-10">
      <h2 className="text-2xl font-bold mb-5">{event.title}</h2>
      <p>{event.description}</p>
      <p>Date: {event.date}</p>
      <p>Capacity: {event.capacity}</p>
      <Link to={`/update-event/${event.id}`} className="mt-5 mr-2 bg-blue-500 text-white p-2">Update Event</Link>
      <button onClick={handleRsgistration} className="mt-5 bg-blue-500 text-white p-2">Register</button>
      {message && <p className="mt-5">{message}</p>}
    </div>
  )
}

export default EventDetails