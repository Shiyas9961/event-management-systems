import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authcontext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="text-white text-lg mr-4">Home</Link>
          {user && <Link to="/create-event" className="text-white text-lg mr-4">Create Event</Link>}
          {user && <Link to="/user-events" className="text-white text-lg mr-4">My Events</Link>}
        </div>
        <div>
          {user ? (
            <button onClick={logout} className="text-white text-lg">Logout</button>
          ) : (
            <>
              <Link to="/login" className="text-white text-lg mr-4">Login</Link>
              <Link to="/register" className="text-white text-lg">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
