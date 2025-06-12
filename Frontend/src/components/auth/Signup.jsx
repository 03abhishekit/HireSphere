import React, { useEffect, useState } from 'react';
import NavBar from '../shared/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { USER_API_END_POINT } from '../../utils/constant';
import { setLoading } from '../../redux/authSlice';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import Footer from '../shared/Footer';

const Signup = () => {
  const [input, setInput] = useState({
    userName: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
    file: '',
  });

  const [validationErrors, setValidationErrors] = useState({});
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      toast.info('You are already registered!');
      navigate('/login');
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setInput({
      ...input,
      file: e.target.files?.[0],
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!input.userName.trim()) errors.userName = 'Please enter your username';
    if (!input.email.trim()) errors.email = 'Please enter your email';
    else if (!/\S+@\S+\.\S+/.test(input.email)) errors.email = 'Invalid email format';
    if (!input.phoneNumber.trim()) errors.phoneNumber = 'Please enter your phone number';
    if (!input.password.trim()) errors.password = 'Please enter your password';
    else if (input.password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (!input.role) errors.role = 'Please select your role';
    if (!input.file) errors.file = 'Please upload a profile picture';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (res?.data?.success) {
        toast.success(res.data.message);
        navigate('/login');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Registration failed');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-100 via-white to-emerald-200 flex flex-col">
      <NavBar />

      <div className="flex-1 flex justify-center items-center px-4 py-10 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-200 shadow-xl rounded-xl p-6 sm:p-8 w-full max-w-lg"
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-indigo-600">
            Create an Account
          </h1>

          {/* Username */}
          <div className="mb-4">
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={input.userName}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {validationErrors.userName && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.userName}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={input.email}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {validationErrors.email && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {validationErrors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.phoneNumber}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={input.password}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {validationErrors.password && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.password}</p>
            )}
          </div>

          {/* Role */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <div className="flex flex-wrap gap-4">
              {['student', 'recruiter'].map((role) => (
                <label key={role} className="inline-flex items-center text-sm text-gray-700">
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={input.role === role}
                    onChange={handleInputChange}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 capitalize">{role}</span>
                </label>
              ))}
            </div>
            {validationErrors.role && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.role}</p>
            )}
          </div>

          {/* File Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Photo
            </label>
            <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition">
              <svg className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="mt-2 text-sm text-gray-600 text-center">
                {input.file ? (
                  <span className="text-indigo-600 font-medium">{input.file.name}</span>
                ) : (
                  <>
                    <span className="font-medium text-indigo-600">Click to upload</span> or drag and drop
                  </>
                )}
              </p>
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
            {validationErrors.file && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.file}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center px-4 py-3 text-white font-medium rounded-lg transition ${
                loading
                  ? 'bg-indigo-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {loading && <Loader2 className="animate-spin mr-2 h-5 w-5" />}
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </div>

          {/* Redirect */}
          <div className="text-center mt-6">
            <p className="text-xs text-gray-500">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-indigo-600 hover:underline">
                Terms
              </a>{' '}
              and{' '}
              <a href="#" className="text-indigo-600 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
            <p className="mt-4 text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-600 hover:underline font-medium">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Signup;
