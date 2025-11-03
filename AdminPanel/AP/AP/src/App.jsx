import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Protected from './components/Protetcted/Protected'
import Login from './Pages/Login/Login'
import Dashboard from './Pages/Dashboard/Dashboard'
import Navbar from './components/navbar/Navbar'
import OrganizationsPage from './Pages/organizations/Organizations'
import DocumentCards from './Pages/blogs/DocumentCards'
import EditBlogPage from './Pages/EditBlogPage/EditBlogPage'
import DashboardIndex from './Pages/DashboardIndex/DashboardIndex'
import CreateOrganizationPage from './Pages/createOrganization/CreateOrganization'
import EditOrganizationPage from './Pages/EditOrganizationPage/EditOrganizationPage'
import CreateBlogPage from './Pages/createBlogs/CreateBlog'
import SuccessStories from './Pages/SuccessStories/SuccessStories'
import VideoForm from './Pages/Vedios/Vedios'
// import ChangePassword from './Pages/PasswordChange/PasswordChange'
import Profile from './Pages/Profile/Profile'
function App() {

  return (
    <>
<BrowserRouter>
<Navbar/>
<Routes>
<Route path='/' element={<Protected><></></Protected>}/>

          <Route path="/dashboard" element={<Protected><Dashboard /></Protected>}>
          <Route path="OrganizationPage" element={<OrganizationsPage />} />
          <Route path="BlogPage" element={<DocumentCards />} />
          <Route path='createorg' element={<CreateOrganizationPage/>}/>
          <Route path='edit-organization/:id' element={<EditOrganizationPage/>}/>
          <Route path='edit-Blog/:id' element={<EditBlogPage/>}/>
          <Route path='create-document' element={<CreateBlogPage/>}/>
          <Route path='successstories' element={<SuccessStories/>}/>
          <Route path='Vedios' element={<VideoForm/>}/>
          <Route path='Profile' element={<Profile/>}/>
          {/* <Route path="change-password" element={<ChangePassword />} /> */}
          <Route index element={<DashboardIndex/>} />
        
          </Route>

<Route path='/Login' element={<Protected><Login/></Protected>}/>
</Routes>
</BrowserRouter>
    </>
  )
}

export default App
