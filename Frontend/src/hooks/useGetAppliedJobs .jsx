





import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '../utils/constant';
import { setAllAppliedJobs, setError, setLoading } from '../redux/applicationSlice';


const useGetAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      dispatch(setLoading(true));
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res?.data?.success) {
          dispatch(setAllAppliedJobs(res?.data?.applications));
        }
      } catch (error) {
         dispatch(setError(error.response?.data?.message || "Failed to fetch jobs"));
        console.error('Failed to fetch applied jobs:', error);
      }
      finally{
        dispatch(setLoading(false));
      }
    };

    fetchAppliedJobs();
  }, [dispatch]);
};

export default useGetAppliedJobs;
