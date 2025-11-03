import React from 'react'
import { resetUser } from '../../redux/userslice'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
const Dashboard = () => {
    const Dispatch=useDispatch()
    // Dispatch(resetUser())
  return (
<Outlet/>
  )
}

export default Dashboard