

import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { COMPANY_API_END_POINT } from '../utils/constant';
import { setCompanies, setError, setLoading, setSuccessMessage } from '../redux/companySlice';

const useGetAllCompanies = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCompanies = async () => {
            dispatch(setLoading(true));
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true });
                if (res?.data?.success) {
                    dispatch(setCompanies(res?.data?.companies));
                    dispatch(setSuccessMessage(res?.data?.message));
                } else {
                    dispatch(setError(res?.data?.message || "Failed to fetch companies"));
                }
            } catch (error) {
                console.error("Error fetching companies:", error);
                dispatch(setError(error.response?.data?.message || "Network error"));
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchCompanies();
    }, [dispatch]);
};

export default useGetAllCompanies;



