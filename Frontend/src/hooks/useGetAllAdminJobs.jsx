


import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { JOB_API_END_POINT } from '../utils/constant';
import { setAllAdminJobs, setError } from '../redux/jobSlice';

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`,{withCredentials:true});
                if(res?.data?.success){
                    dispatch(setAllAdminJobs(res?.data?.jobs));
                }
                else {
                    dispatch(setError(res?.data?.message || "Failed to fetch admin jobs"));
                }
            } catch (error) {
               dispatch(setError(error.response?.data?.message || "Failed to fetch admin jobs"));
            }
        }
        fetchAllAdminJobs();
    },[dispatch])
}

export default useGetAllAdminJobs



