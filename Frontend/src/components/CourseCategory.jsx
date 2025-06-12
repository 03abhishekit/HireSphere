import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchJobByText } from '../redux/jobSlice';

const categories = [
  "Frontend Developer", "Backend Developer", "Full Stack Developer",
  "Machine Learning Engineer", "Data Scientist", "Data Analyst",
  "Cloud Engineer", "DevOps Engineer", "Mobile App Developer",
  "UI/UX Designer", "AI Engineer", "Cybersecurity Analyst",
  "Product Manager", "Software Tester", "Data Engineer",
  "Graphic Designer", "Software Developer", "BlockChain Developer",
  "Database Administrator", "Software Architect",
];

const CourseCategory = () => {
  const dispatch = useDispatch();

  const handleCategory = (category) => {
    dispatch(setSearchJobByText(category));
  };

  return (
    <div className="bg-gradient-to-br from-white via-emerald-50 to-emerald-100 hover:bg-green-200 py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-10">
          Explore by Job Title
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {categories.map((title, index) => (
            <button
              key={index}
              onClick={() => handleCategory(title)}
              className="bg-white text-gray-700 border border-emerald-300 py-2 px-3 rounded-xl shadow hover:bg-emerald-100 hover:text-emerald-900 hover:scale-[1.03] transition-all duration-200 text-sm sm:text-base"
            >
              {title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseCategory;
