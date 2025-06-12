import React from 'react';
import Job from './Job';
import NavBar from './shared/NavBar';
import useGetAllJobs from '../hooks/useGetAllJobs';
import { useDispatch, useSelector } from 'react-redux';
import Footer from './shared/Footer';

const ShowJobs = () => {
  useGetAllJobs();
  const { allJobs } = useSelector(store => store.job);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-50 via-white to-emerald-100 text-gray-800">
      <NavBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-800">
            {allJobs.length} Jobs Found
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allJobs.map((job, index) => (
            <Job key={index} job={job} />
          ))}
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default ShowJobs;
