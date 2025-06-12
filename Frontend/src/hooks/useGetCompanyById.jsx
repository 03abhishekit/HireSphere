import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { COMPANY_API_END_POINT } from '../utils/constant';
import { setSingleCompany, setError, setLoading } from '../redux/companySlice';

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchSingleCompany = async () => {
            if (!companyId) return;
            
            dispatch(setLoading(true));
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, { withCredentials: true });
                if (res?.data?.success) {
                    dispatch(setSingleCompany(res.data.company));
                } else {
                    dispatch(setError(res.data.message || "Failed to fetch company"));
                }
            } catch (error) {
                console.log(error);
                dispatch(setError(error.response?.data?.message || "Network error"));
            } finally {
                dispatch(setLoading(false));
            }
        };
        
        fetchSingleCompany();
    }, [companyId, dispatch]);
};

export default useGetCompanyById;



