

import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs, setError, setLoading } from '../redux/jobSlice';
import { JOB_API_END_POINT } from '../utils/constant';

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchJobByText, filters } = useSelector(store => store.job);


  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        dispatch(setLoading(true));
        const res = await axios.get(`${JOB_API_END_POINT}/get`, {
          params: { keyword: searchJobByText },
          withCredentials: true
        });
        if (res?.data?.success) {
          dispatch(setAllJobs(res.data.jobs));
        } else {
          dispatch(setError(res.data.message || "Failed to fetch jobs"));
        }
      } catch (error) {
        dispatch(setError(error.response?.data?.message || "Failed to fetch jobs"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchAllJobs();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [dispatch, searchJobByText]);
};

export default useGetAllJobs;



