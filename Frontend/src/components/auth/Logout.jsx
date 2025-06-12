import React, { useEffect } from 'react';
import NavBar from '../shared/NavBar';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setUser } from '../../redux/authSlice';
import { USER_API_END_POINT } from '../../utils/constant';
import Footer from '../shared/Footer';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/logout`, {
          withCredentials: true
        });
        if (res?.data?.success) {
          dispatch(setUser(null));
          toast.success(res.data.message);
          setTimeout(() => navigate("/login"), 2000);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Logout failed");
        setTimeout(() => navigate("/"), 2000);
      }
    };

    const timer = setTimeout(() => logoutUser(), 2000);
    return () => clearTimeout(timer);
  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 flex flex-col">
      <NavBar />

      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 py-8">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-sm sm:max-w-md mx-auto border border-gray-200 p-6 sm:p-8">
          <div className="flex flex-col items-center space-y-6 text-center">
            {/* Animation circle */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24">
              <div className="absolute inset-0 rounded-full bg-indigo-100 animate-pulse"></div>
              <div className="absolute inset-2 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
              <svg
                className="absolute inset-3 text-indigo-600 w-12 h-12 sm:w-14 sm:h-14 opacity-0 animate-fade-in"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            {/* Heading */}
            <div className="space-y-1 sm:space-y-2">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Logging You Out</h1>
              <p className="text-gray-500 text-sm sm:text-base">
                Securing your session before signing out...
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-full space-y-1 sm:space-y-2">
              <div className="h-2 sm:h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-progress"
                  style={{ width: '55%' }}
                ></div>
              </div>
              <span className="text-xs sm:text-sm text-gray-400">Almost done</span>
            </div>

            {/* Button (invisible during logout) */}
            <button
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
              style={{ opacity: 0, animation: 'fade-in-delay 2s ease-in-out forwards' }}
            >
              Return to Login
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Logout;
