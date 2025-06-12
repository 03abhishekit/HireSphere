import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '../../../redux/companySlice';
import { toast } from 'react-toastify';
import NavBar from '../../shared/NavBar';
import { COMPANY_API_END_POINT } from '../../../utils/constant';
import Footer from '../../shared/Footer';
import { ArrowLeft } from 'lucide-react';

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    companyName: '',
    description: '',
    companyLocation: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.companyName.trim()) {
      toast.error('Company name is required');
      return false;
    }
    if (!formData.description.trim()) {
      toast.error('Description is required');
      return false;
    }
    if (!formData.companyLocation.trim()) {
      toast.error('Location is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const { data } = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        formData,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      if (data?.success) {
        dispatch(setSingleCompany(data.company));
        toast.success('Company created successfully');
        navigate('/recruiter/companies');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create company');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-emerald-50 via-white to-emerald-100 min-h-screen flex flex-col">
      <NavBar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow">
        <div className="max-w-2xl mx-auto bg-gray-200 rounded-2xl shadow-lg p-6 sm:p-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition mb-6"
          >
            <ArrowLeft size={20} className="mr-2" />
            <span className="font-medium text-sm sm:text-base">Back</span>
          </button>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-8">
            🏢 Create New Company
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Company Name *</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                placeholder="e.g., OpenAI Inc."
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                placeholder="What does the company do?"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Location *</label>
              <input
                type="text"
                name="companyLocation"
                value={formData.companyLocation}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                placeholder="e.g., San Francisco, CA"
                required
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition disabled:opacity-60"
              >
                {isSubmitting ? 'Creating...' : 'Create Company'}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CompanyCreate;
