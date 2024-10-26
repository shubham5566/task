import { useState } from 'react'
import Navbar from './componants/Navbar'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';


function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <>
    <Navbar/>
    {
      isAuthenticated ? <Outlet /> : <Navigate to="/login" />
    }
    <Outlet/>
    </>
    
  )
}

export default App
