// import React from 'react'
// import { resetUser } from '../../redux/userslice'
// import { useDispatch } from 'react-redux'
// import { Outlet } from 'react-router-dom'
// const Dashboard = () => {
//     const Dispatch=useDispatch()
//     // Dispatch(resetUser())
//   return (
// <Outlet/>
//   )
// }

// export default Dashboard
import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/navbar/Navbar' // Adjust the import path as needed
import SimpleEditor from '../../components/editor/TextEditor'
const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard
