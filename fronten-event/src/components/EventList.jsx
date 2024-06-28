import axios from '../axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/authcontext'
import { Link } from 'react-router-dom'

const EventList = () => {
    const [events, setEvents] = useState([])
    const { authTokens } = useContext(AuthContext)
    useEffect(() => {
        const getEvents = async () => {
            const response = await axios.get('api/events/', {
                headers : {
                    Authorization : `Bearer ${authTokens.access}`
                }
            })
            const data = response.data
            setEvents(data)
        }
        getEvents()
    },[authTokens])

  return (
    <div className='max-w-4xl mx-auto my-10'>
        <Link className='w-full bg-blue-500 text-white p-2 m-4' to={'/'}>Home</Link>
        <h2 className='text-2xl font-bold mb-5 mt-3'>Events</h2>
        <ul>
            {
                events.map((event) => (
                    <Link key={event.id}  to={`/events/${event.id}`}>
                        <li className="mb-4 p-4 border rounded">
                            <h3 className="text-xl font-bold">{event.title}</h3>
                            <p>{event.description}</p>
                            <p>Date: {event.date}</p>
                            <p>Capacity: {event.capacity}</p>
                        </li>
                    </Link>   
                ))
            }
        </ul>
    </div>
  )
}

export default EventList