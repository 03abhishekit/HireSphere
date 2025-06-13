// JobUpdate.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Loader2, ArrowLeft } from 'lucide-react';
import { setError, setLoading, updateJob } from '../../../redux/jobSlice';
import { JOB_API_END_POINT } from '../../../utils/constant';
import NavBar from '../../shared/NavBar';
import Footer from '../../shared/Footer';
import { toast } from 'react-toastify';

const JobUpdate = () => {
  const { id } = useParams();
  

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { companies } = useSelector(store => store.company);
  
  const { user } = useSelector(store => store.auth);
  
  const [form, setForm] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userId = user?._id;
  useEffect(() => {
    const fetchJob = async () => {
      dispatch(setLoading());
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, { 
          withCredentials: true 
        });
        
   
        if (res?.data?.success) {
          const job = res?.data?.job;
          setForm({
            jobTitle: job.jobTitle,
            description: job.description,
            requirements: job.requirements.join(', '),
            salary: job.salary,
            salaryType: job.salaryType,
            experienceLevel: job.experienceLevel,
            jobLocation: job.jobLocation,
            employmentType: job.employmentType,
            position: job.position,
            company: job.company
          });
        }
      } catch (err) {
        dispatch(setError(err.response?.data?.message || 'Failed to fetch job'));
      }
    };
    fetchJob();
  }, [id, dispatch]);


    const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate requirements format
      const requirementsArray = form.requirements 
        ? form.requirements.split(',').map(r => r.trim()).filter(r => r)
        : [];

      const reqBody = {
        ...form,
        requirements: requirementsArray,
        salary: Number(form.salary),
        position: Number(form.position),
      };

      const res = await axios.put(`${JOB_API_END_POINT}/put/${id}`, reqBody, { 
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (res?.data?.success) {
        dispatch(updateJob(res.data.job));
        toast.success(res.data.message || "Job updated successfully");
        navigate(`/`);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message 
        || error.message 
        || 'Failed to update job';
      toast.error(errorMessage);
      
      // Handle specific error cases
      if (error.response?.status === 403) {
        navigate('/login');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNumberChange = (e) => {
    const value = Math.max(0, e.target.value);
    setForm(prev => ({ ...prev, [e.target.name]: value }));
  };

  if (!form) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="animate-spin h-12 w-12 text-blue-600" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-50 via-white to-emerald-100">
      <NavBar />
      
      <div className="max-w-3xl mx-auto px-4 py-8 mt-20">
        <div className="bg-teal-50 rounded-xl shadow-md p-6 md:p-8">
          <div className="mb-6 flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Update Job Posting</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Job Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title
                </label>
                <input
                  name="jobTitle"
                  value={form.jobTitle}
                  onChange={(e) => setForm({...form, jobTitle: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Salary */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salary
                </label>
                <input
                  type="number"
                  name="salary"
                  value={form.salary}
                  onChange={handleNumberChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Salary Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salary Type
                </label>
                <select
                  name="salaryType"
                  value={form.salaryType}
                  onChange={(e) => setForm({...form, salaryType: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Yearly">Yearly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Hourly">Hourly</option>
                </select>
              </div>

              {/* Experience Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level
                </label>
                <select
                  name="experienceLevel"
                  value={form.experienceLevel}
                  onChange={(e) => setForm({...form, experienceLevel: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Junior">Junior</option>
                  <option value="Fresher">Fresher</option>
                  <option value="Mid">Mid</option>
                  <option value="Senior">Senior</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={(e) => setForm({...form, description: e.target.value})}
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Requirements (comma separated)
              </label>
              <input
                name="requirements"
                value={form.requirements}
                onChange={(e) => setForm({...form, requirements: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Employment Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employment Type
                </label>
                <select
                  name="employmentType"
                  value={form.employmentType}
                  onChange={(e) => setForm({...form, employmentType: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                  <option value="Temporary">Temporary</option>
                </select>
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <select
                  name="company"
                  value={form.company}
                  onChange={(e) => setForm({...form, company: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {companies.map(company => (
                    <option key={company._id} value={company._id}>
                      {company.companyName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin mx-auto h-5 w-5" />
              ) : (
                'Update Job Posting'
              )}
            </button>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default JobUpdate;


