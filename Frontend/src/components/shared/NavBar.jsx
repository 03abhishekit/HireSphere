
import React, { useState } from 'react';
import hireSphere from '/HireSphere.png';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { ChevronDown, LogOut, User, Menu, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

const NavBar = () => {
   const {user} = useSelector(store => store.auth);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMenuToggle = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const handleProfileToggle = () => setIsProfileOpen(!isProfileOpen);


  return (
       <header className=" bg-gradient-to-r from-emerald-100 via-white to-emerald-200 text-blue-100 shadow-md w-full z-50 sticky top-0">
  <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-2 sm:py-3 flex justify-between items-center">

    {/* Logo with overlapping effect */}
      <NavLink to="/" className="flex items-center gap-4 text-2xl font-bold text-blue-700">
        <div className="flex items-center gap-2">
            <img 
              src={hireSphere} 
              alt="HireSphere" 
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-blue-400 shadow-lg object-cover"
            />


          <span className="text-blue-600">HireSphere</span>
        </div>
        <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-200 transform scale-x-0 hover:scale-x-100 transition-transform origin-left duration-300"></span>
      </NavLink>
    {/* Desktop Nav */}
    <nav className="hidden md:flex space-x-6 items-center">
      {user && user?.role === "recruiter" ? (
        <>
         <NavLink
              to="/jobs"
              className={({ isActive }) =>
                `relative px-2 py-1 font-medium transition-colors ${
                  isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`
              }
            >
              All Jobs
          </NavLink>

            <NavLink
                  to="/recruiter/companies"
                  className={({ isActive }) =>
                    `relative px-2 py-1 font-medium transition-colors ${
                      isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                    }`
                  }
                >
                  Companies
              </NavLink>
               <NavLink
                    to="/recruiter/jobs"
                    className={({ isActive }) =>
                      `relative px-2 py-1 font-medium transition-colors ${
                        isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                      }`
                    }
                  >
                    Post a Job
                </NavLink>
        </>
      ) : (
        <>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative px-2 py-1 font-medium transition-colors ${
                isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`
            }
          >
            Start a Search
          </NavLink>

          <NavLink
            to="/jobs"
            className={({ isActive }) =>
              `relative px-2 py-1 font-medium transition-colors ${
                isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`
            }
          >
            My Jobs
          </NavLink>

          <NavLink
            to="/showJobs"
            className={({ isActive }) =>
              `relative px-2 py-1 font-medium transition-colors ${
                isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`
            }
          >
            Job Listings
          </NavLink>

        </>
      )}
    </nav>

    {/* Auth Section - Enhanced Design */}
    <div className="hidden md:flex items-center space-x-4">
      {!user ? (
        <>
          <Link 
            to="/login" 
            className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-blue-600 font-medium shadow-md hover:shadow-lg transition-all"
          >
            Sign Up
          </Link>
        </>
      ) : (
        <div className="relative group">
          <button 
            onClick={handleProfileToggle}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <div className="relative">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-blue-100 to-blue-50 flex items-center justify-center border-2 border-blue-200">

                {user?.profile?.profilePhoto ? (
                  <img 
                    src={user?.profile?.profilePhoto} 
                    alt={user.userName} 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-blue-600 font-semibold text-sm sm:text-base">

                    {user.userName.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isProfileOpen ? 'transform rotate-180' : ''}`} />
          </button>
            {
              isProfileOpen &&(
              <div className="absolute right-0 mt-2 bg-[#f4f1de] shadow-xl rounded-lg p-2 w-56 z-20 border border-gray-100 animate-fadeIn">
              <div className="flex items-center space-x-2 mb-2">
                
                <div>
                  <p className="font-semibold px-2 py-2 text-gray-700 hover:bg-yellow-50 rounded-lg transition-colors text-gray-800">Welcome, {user.userName}</p>
                </div>
              </div>
              
              <hr className="my-1 border-gray-100" />
              
              <Link 
                to="/profile" 
                 onClick={() => setIsProfileOpen(false)}
                className="flex items-center space-x-2 px-2 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <User className="w-4 h-4 text-blue-500" />
                <span>My Profile</span>
              </Link>
              
              <hr className="my-1 border-gray-100" />
              
              <Link 
                to="/logout" 
                   onClick={() => setIsProfileOpen(false)}
                className="flex items-center space-x-2 px-2 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Link>
            </div>
              )
            }
          
        </div>
      )}
    </div>

    {/* Mobile Toggle - Improved Button */}
    <button 
          onClick={handleMenuToggle} 
          className="md:hidden p-1.5 sm:p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors focus:outline-none"
        >

      {isMobileMenuOpen ? (
        <X size={24} className="text-current" />
      ) : (
        <Menu size={24} className="text-current" />
      )}
    </button>
  </div>

  {/* Mobile Navigation Menu - Enhanced Design */}
  {isMobileMenuOpen && (
    <div className="md:hidden bg-white px-6 py-4 space-y-4 shadow-lg animate-slideDown">
      <div className="flex flex-col space-y-4">
        {user && user.role === "recruiter" ? (
          <>
  <NavLink
    to="/jobs"
    className={({ isActive }) =>
      `px-3 py-2 rounded-lg text-sm sm:text-base transition-colors ${
        isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-blue-50'
      }`
    }
  >
    All Jobs
  </NavLink>

  <NavLink
    to="/recruiter/companies"
    className={({ isActive }) =>
      `px-3 py-2 rounded-lg text-sm sm:text-base transition-colors ${
        isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-blue-50'
      }`
    }
  >
    Companies
  </NavLink>

  <NavLink
    to="/recruiter/jobs"
    className={({ isActive }) =>
      `px-3 py-2 rounded-lg text-sm sm:text-base transition-colors ${
        isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-blue-50'
      }`
    }
  >
    Post a Job
  </NavLink>
</>

        ) : (
           <>
  <NavLink
    to="/"
    className={({ isActive }) =>
      `px-3 py-2 rounded-lg text-sm sm:text-base transition-colors ${
        isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-blue-50'
      }`
    }
  >
    Start a Search
  </NavLink>
  <NavLink
    to="/jobs"
    className={({ isActive }) =>
      `px-3 py-2 rounded-lg text-sm sm:text-base transition-colors ${
        isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-blue-50'
      }`
    }
  >
    My Jobs
  </NavLink>
  <NavLink
    to="/showJobs"
    className={({ isActive }) =>
      `px-3 py-2 rounded-lg text-sm sm:text-base transition-colors ${
        isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-blue-50'
      }`
    }
  >
    Job Listings
  </NavLink>
</>

        )}
      </div>

      <div className="border-t border-gray-100 pt-4">
        {!user ? (
          <div className="flex flex-col space-y-3">
            <Link 
              to="/login" 
              className="px-4 py-2 text-center text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="px-4 py-2 text-center bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full hover:from-blue-700 hover:to-blue-600 shadow-md transition-all"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="space-y-1 text-sm w-48">
              {/* Welcome Box */}
              <div className="flex items-center space-x-2 px-3 py-2 bg-blue-100 rounded-md shadow-sm">
                <div className="text-blue-700 text-xs sm:text-sm font-semibold truncate">
                  Welcome, {user.userName}
                </div>
              </div>

              {/* Profile Link */}
              <Link
                to="/profile"
                className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-blue-50 transition-colors text-gray-700"
              >
                <User className="w-4 h-4 text-blue-500" />
                <span className="text-sm">My Profile</span>
              </Link>

              {/* Logout Button */}
              <Link
                 to="/logout" 
                className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-red-50 transition-colors text-red-600 w-full"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Logout</span>
              </Link>
            </div>

             )}
          </div>
          </div>
         )}

    </header>
  );
};

export default NavBar;


