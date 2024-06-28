import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authcontext';
import Register from './components/Register'
import Login from './components/Login';
import EventList from './components/EventList';
import EventDetails from './components/EventDetails';
import UserEvents from './components/UserEvents';
import CreateEvent from './components/CreateEvent';
import UpdateEvent from './components/UpdateEvent';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className='container mx-auto'>
          <Routes>
          <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path='/' element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }/>
            <Route path='/nav-bar' element={
              <ProtectedRoute>
                <Navbar />
              </ProtectedRoute>
            }/>
            <Route path="/events" element={
              <ProtectedRoute>
                  <EventList />
              </ProtectedRoute>
            } />
            <Route path="/events/:id" element={
              <ProtectedRoute>
                <EventDetails />
              </ProtectedRoute>
            } />
            <Route path="/user/events" element={
              <ProtectedRoute>
                <UserEvents />
              </ProtectedRoute>
            } />
            <Route path="/create-event" element={
              <ProtectedRoute>
                <CreateEvent />
              </ProtectedRoute>
            } />
            <Route path="/update-event/:id" element={
              <ProtectedRoute>
               <UpdateEvent /> 
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
