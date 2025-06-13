
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { JOB_API_END_POINT } from '../../../utils/constant';
import NavBar from '../../shared/NavBar';
import Footer from '../../shared/Footer';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';

const JobCreate = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    description: '',
    requirements: '',
    salary: '',
    salaryType: '',
    jobLocation: '',
    employmentType: '',
    experienceLevel: '',
    position: '',
    company: ''
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector(store => store.company);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const requirementsArray = formData.requirements
        .split(',')
        .map(req => req.trim())
        .filter(req => req);

      const payload = {
        ...formData,
        position: Number(formData.position),
        salary: Number(formData.salary),
        requirements: requirementsArray
      };

      const res = await axios.post(`${JOB_API_END_POINT}/create`, payload, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });

      
      if (res?.data?.success) {
        toast.success('Job posted successfully!');
        navigate('/recruiter/jobs');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-emerald-50 via-white to-emerald-100">
      <NavBar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-200 rounded-xl shadow-md overflow-hidden p-6 md:p-8">
             <button 
                  onClick={() => navigate(-1)}
                  className="flex items-center text-blue-600 hover:text-blue-800 transition mb-6"
                >
                  <ArrowLeft size={20} className="mr-2" />
                  <span className="font-medium">Back</span>
                </button>
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Post a New Job</h1>
              <p className="text-gray-600 mt-2">Fill in the details to create a new job posting</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Job Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
                  <select
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select Company</option>
                      {companies?.map((comp) => (
                        <option key={comp._id} value={comp._id}>
                          {comp.companyName}
                        </option>
                      ))}
                    </select>

                </div>

                {/* Salary */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salary *</label>
                  <input
                    type="number"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Salary Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salary Type *</label>
                  <select
                    name="salaryType"
                    value={formData.salaryType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select type</option>
                    <option value="Yearly">Yearly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Hourly">Hourly</option>
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                  <input
                    type="text"
                    name="jobLocation"
                    value={formData.jobLocation}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Employment Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type *</label>
                  <select
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Temporary">Temporary</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                {/* Experience Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level *</label>
                  <select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select level</option>
                    <option value="Junior">Junior</option>
                    <option value="Fresher">Fresher</option>
                     <option value="Mid">Mid</option>
                    <option value="Senior ">Senior</option>
                  </select>
                </div>

                {/* Positions Available */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Positions Available *</label>
                  <input
                    type="number"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Job Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Description *</label>
                <textarea
                  name="description"
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Requirements */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Requirements (comma separated)</label>
                <textarea
                  name="requirements"
                  rows={3}
                  value={formData.requirements}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Bachelor's degree, 2 years experience, JavaScript knowledge"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading && <Loader2 className="animate-spin mr-2 h-5 w-5" />}
                  {loading ? 'Posting Job...' : 'Post Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JobCreate;

