



import React, { useState, useEffect, useRef } from 'react';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchCompanyByText, clearMessages } from '../../../redux/companySlice';
import useGetAllCompanies from '../../../hooks/useGetAllCompanies';
import NavBar from '../../shared/NavBar';
import { toast } from 'react-toastify';
import Footer from '../../shared/Footer';

const Companies = () => {
  const { companies, successMessage, error } = useSelector(store => store.company);
  useGetAllCompanies(); 
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toastTimeoutRef = useRef(null);
   const displayedMessages = useRef({ success: null, error: null })


   useEffect(() => {
    // Clear any pending timeouts on unmount
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

 useEffect(() => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = setTimeout(() => {
      if (successMessage && successMessage !== displayedMessages.current.success) {
        toast.success(successMessage, { toastId: 'company-success' });
        displayedMessages.current.success = successMessage;
        dispatch(clearMessages());
      }
      
      if (error && error !== displayedMessages.current.error) {
        toast.error(error, { toastId: 'company-error' });
        displayedMessages.current.error = error;
        dispatch(clearMessages());
      }
    }, 300); // 300ms delay for consistent UX

    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, [successMessage, error, dispatch]);

  useEffect(() => {
    dispatch(setSearchCompanyByText(searchText));
  }, [searchText, dispatch]);
    
  const filteredCompanies = companies.filter(company => 
    company.companyName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
   <div className="min-h-screen bg-gradient-to-r from-emerald-50 via-white to-emerald-100"> 
  <NavBar />
  <div className="container mx-auto px-4 py-8">
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900">🌟 Discover Companies</h1>
        <button
          onClick={() => navigate("/recruiter/companies/create")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition duration-200 shadow-md"
        >
          <span>➕</span>
          <span>New Company</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <input 
            type="text" 
            placeholder="🔍 Search by company name"
            className="w-full py-3 pl-4 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition duration-300"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      <CompaniesTable companies={filteredCompanies} />
    </div>
  </div>
  <Footer />
</div>
  );
};

export default Companies;







