

import  {createBrowserRouter, RouterProvider} from 'react-router-dom';
import React from 'react'
import NavBar from './components/shared/NavBar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Logout from './components/auth/Logout'
import Home from './components/Home'
import Jobs from './components/Jobs'
import ShowJobs from './components/ShowJobs'
import Profile from './components/user/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/company/Companies'
import CompanyCreate from './components/admin/company/CompanyCreate'
import AdminJobs from './components/admin/AdminJobs'
import JobCreate from './components/admin/job/JobCreate'
import JobUpdate from './components/admin/job/JobUpdate'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import UpdateCompany from './components/admin/company/UpdateCompany';






const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Signup />
  },
  {
    path: '/logout',
    element: <Logout />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },

  {
    path: "/showJobs",
    element: <ShowJobs/>
  },

  {
    path: '/profile',
    element: <Profile />
  },

  {
    path:"/recruiter/companies",
    element: <ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:"/recruiter/companies/create",
    element: <ProtectedRoute><CompanyCreate/></ProtectedRoute> 
  },
  {
    path:"/recruiter/companies/:id",
    element:<ProtectedRoute><UpdateCompany/></ProtectedRoute> 
  },
  {
    path:"/recruiter/jobs",
    element:<ProtectedRoute><AdminJobs/></ProtectedRoute> 
  },
  {
    path:"/recruiter/jobs/register",
    element:<ProtectedRoute><JobCreate/></ProtectedRoute> 
  },
  
  {
    path:"/recruiter/jobs/update/:id",
    element :<ProtectedRoute><JobUpdate/></ProtectedRoute>
  },
   
  {
    path:"/recruiter/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute> 
  },
 
])

const App = () => {
  return (
    <div className='bg-gradient-to-r from-emerald-50 via-white to-emerald-100 min-h-screen '>
         <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
