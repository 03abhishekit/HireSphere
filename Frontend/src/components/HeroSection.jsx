import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchJobByText } from '../redux/jobSlice';

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchJobByText(searchTerm));
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, dispatch]);

  const handleJobSearch = () => {
    navigate('/showJobs');
  };

  return (
    <div className="bg-gradient-to-br from-white via-green-100 to-green-200 py-20 px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="max-w-5xl mx-auto text-center">
        <span
          onClick={handleJobSearch}
          className="inline-block cursor-pointer px-4 py-2 mb-4 rounded-full bg-green-100 text-green-700 text-sm font-medium shadow hover:bg-green-200 transition"
        >
          🚀 No.1 Job Hunt Platform
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
          Find your <span className="text-green-600 underline">dream job</span> today
        </h1>

        <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto mb-10">
          Thousands of opportunities in tech, engineering, and design are waiting for you.
        </p>

        <div className="flex justify-center">
          <div className="relative w-full max-w-xl">
            <div className="flex items-center w-full bg-white rounded-full shadow-md px-5 py-3 border border-gray-200 focus-within:ring-2 focus-within:ring-green-500 transition">
              <Search className="text-gray-400 mr-3 w-5 h-5 shrink-0" />

              <input
                type="text"
                placeholder="Search by job title"
                className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 text-white px-4 py-1.5 text-sm rounded-full hover:bg-green-700 transition"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
