import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    let navigate = useNavigate();
    localStorage.removeItem('token');

    useEffect(() => {
      navigate('/');
    },[]
    )
  return (
    <div>Logout</div>
  )
}

export default Logout