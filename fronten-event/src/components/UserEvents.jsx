import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/authcontext'
import axios from '../axios'

const UserEvents = () => {

    const [events, setEvents] = useState([])
    const { authTokens } = useContext(AuthContext)

    useEffect(() => {
        const getEventbyUser = async () => {
            try{
                const response = await axios.get('api/events/my-events/', {
                    headers : {
                        Authorization : `Bearer ${authTokens.access}`
                    }
                })
                setEvents(response.data)
            }catch(err){
                console.log(err)
            }
        }
        getEventbyUser()
    }, [authTokens])

  return (
    <div className="max-w-4xl mx-auto my-10">
      <h2 className="text-2xl font-bold mb-5">My Events</h2>
      <ul>
        {events.map(event => (
          <li key={event.id} className="mb-4 p-4 border rounded">
            <h3 className="text-xl font-bold">{event.title}</h3>
            <p>{event.description}</p>
            <p>Date: {event.date}</p>
            <p>Capacity: {event.capacity}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserEvents