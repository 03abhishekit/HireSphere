





import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, setSearchJobByText, resetFilters } from '../redux/jobSlice';

const FilterCard = () => {
  const dispatch = useDispatch();
  const { searchJobByText, filters } = useSelector(state => state.job);

  const FILTER_OPTIONS = [
    {
      name: 'employmentType',
      label: 'Employment Type',
      options: ['Full-time', 'Part-time',  'Internship', 'Temporary']
    },
    {
      name: 'jobLocation',
      label: 'Location',
      options: ['Mumbai', 'Bangalore', 'Delhi', 'Hyderabad', 'Pune', 'Kolkata']
    },
    {
      name: 'experienceLevel',
      label: 'Experience Level',
      options: ['Fresher', 'Junior', 'Mid', 'Senior']
    },
    {
      name: 'salary',
      label: 'Salary',
      options: ['0 - 9', '10 - 19', '20 - 39', '40 - 59', '60 >=']
    },
    {
      name: 'salaryType',
      label: 'Salary Type',
      options: ["Yearly", "Monthly", "Hourly"],
    }
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilters({ ...filters, [name]: value }));
  };

  const handleClearFilter = (filterName) => {
    dispatch(setFilters({ ...filters, [filterName]: '' }));
  };

  return (
    <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-cyan-100 p-6 rounded-lg shadow-md border border-indigo-100">
      <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Job Filters</h3>
      
      <div className="mb-6">
        <label className="block text-lg font-medium text-blue-400 mb-2">Search</label>
        <input
          type="text"
          value={searchJobByText}
          onChange={(e) => dispatch(setSearchJobByText(e.target.value))}
          placeholder="Job title, company..."
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {FILTER_OPTIONS.map((filter) => (
        <div key={filter.name} className="mb-6 p-4 sm:p-5 bg-gray-200 hover:bg-gray-300  rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium">{filter.label}</h4>
            {filters[filter.name] && (
              <button 
                onClick={() => handleClearFilter(filter.name)}
                className="text-xs text-purple-600 hover:text-purple-800"
              >
                Clear
              </button>
            )}
          </div>
          <div className="space-y-2">
            {filter.options.map((option) => (
              <div key={option} className="flex items-center">
                <input
                  type="radio"
                  id={`${filter.name}-${option}`}
                  name={filter.name}
                  value={option}
                  checked={filters[filter.name] === option}
                  onChange={handleFilterChange}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label 
                  htmlFor={`${filter.name}-${option}`}
                  className="flex items-center ml-2  gap-4 text-sm text-gray-700 cursor-pointer"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={() => dispatch(resetFilters())}
        className="w-full mt-4 py-2 bg-purple-200 hover:bg-purple-300 rounded-md transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default FilterCard;

