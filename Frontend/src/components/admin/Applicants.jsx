


import React, { useEffect } from 'react';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '../../redux/applicationSlice';
import { APPLICATION_API_END_POINT } from '../../utils/constant';
import NavBar from '../shared/NavBar';
import { toast } from 'react-toastify';
import Footer from '../shared/Footer';

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector(store => store.application);
  console.log("all applicamts", applicants);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, {
          withCredentials: true,
        });
         console.log("get res", res?.data?.applicants);
        dispatch(setAllApplicants(res?.data?.applicants));
      } catch (error) {
        toast.error(error.response.data.message);
        console.error('Failed to fetch applicants:', error);
      }
    };

    fetchAllApplicants();
  }, [params.id, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-50 via-white to-emerald-100">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Applicants{' '}
            <span className="text-blue-600 text-xl font-medium">
              ({applicants?.length || 0})
            </span>
          </h1>
        </div>
        {applicants?.length > 0 ? (
          <ApplicantsTable />
        ) : (
          <div className="text-gray-500 mt-10 text-center text-lg">
            No applicants have applied yet.
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default Applicants;

