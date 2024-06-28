import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto my-10">
      <h1 className="text-4xl font-bold mb-5">Welcome to the Event Management System</h1>
      <Link className='w-full bg-blue-500 text-white p-2' to={'/nav-bar'}>Goto Nav</Link>
    </div>
  );
};

export default Home;
