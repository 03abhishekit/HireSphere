



// import React, { useEffect } from 'react'
// import NavBar from './shared/NavBar'
// import HeroSection from './HeroSection'
// import CourseCategory from './CourseCategory'
// import LatestJobs from './LatestJobs'
// import Footer from './shared/Footer'
// import useGetAllJobs from '../hooks/useGetAllJobs'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

// const Home = () => {
//   useGetAllJobs();

//   const {user} = useSelector(store=>store.auth);
//   const navigate = useNavigate();
  
//   // useEffect(() => {
//   //   if (user?.role === 'recruiter') {
//   //     navigate("/recruiter/companies");
//   //   }
//   // }, []);
//   return (
//     <div className="min-h-screen flex flex-col">
//       <NavBar/>
//       <main className="flex-grow">
//         <HeroSection/>
//         <CourseCategory/>
//         <LatestJobs/>
//       </main>
//       <Footer/>
//     </div>
//   )
// }

// export default Home




import React from 'react'
import NavBar from './shared/NavBar'
import HeroSection from './HeroSection'
import CourseCategory from './CourseCategory'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'

const Home = () => {
  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-br from-white via-emerald-100 to-emerald-200'>
      <NavBar/>
      <main className='flex-grow'>
        <HeroSection/>
        <CourseCategory/>
        <LatestJobs/>
      </main>
      <Footer/>
    </div>
  )
}

export default Home
