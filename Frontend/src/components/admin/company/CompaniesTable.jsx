



import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Edit2 } from 'lucide-react';
import { setSingleCompany } from '../../../redux/companySlice';

const CompaniesTable = ({ companies }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading  } = useSelector(store => store.company);


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCompanies = companies.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(companies.length / itemsPerPage);

  const handleEdit = (company) => {
    dispatch(setSingleCompany(company));
    navigate(`/recruiter/companies/${company._id}`);
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  if (loading) return <p className="text-center text-gray-500 mt-10">⏳ Loading...</p>;
  if (!companies.length) return <p className="text-center text-red-500 mt-10">No companies found.</p>;

  return (
    <div className="space-y-6">
      {currentCompanies.map((company) => (
        <div 
          key={company._id} 
          className="border rounded-xl p-6 shadow-md bg-gray-100"
        >
          <div className="flex items-center gap-4 mb-4">
            {company.companyLogo ? (
              <img
                src={company.companyLogo}
                alt={`${company.companyName} logo`}
                className="w-16 h-16 object-cover rounded-md"
              />
            ) : (
              <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-md text-lg font-bold text-gray-700">
                {company.companyName.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h3 className="text-xl font-semibold">{company.companyName}</h3>
              <p className="text-sm text-gray-500">{company.companyLocation}</p>
               <p className="text-sm text-gray-500 mr-2">{company.createdAt.split("T")[0]}</p>
            </div>
            
          </div>

          <p className="text-gray-700 text-sm mb-4 line-clamp-3">{company.description}</p>
          
          {company?.companyWebsite && (
            <a
              href={company.companyWebsite} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline text-sm block mb-4"
            >
              Visit Website
            </a>
          )}

          <div className="flex justify-end">
            <button
              onClick={() => handleEdit(company)}
              className="flex items-center gap-1 text-sm bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              <Edit2 className='w-4 h-4' />
              Edit
            </button>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CompaniesTable;



