




import React, { useEffect, useState } from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useGetCompanyById from '../../../hooks/useGetCompanyById';
import { setSingleCompany, setSuccessMessage } from '../../../redux/companySlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import NavBar from '../../shared/NavBar';
import { COMPANY_API_END_POINT } from '../../../utils/constant';
import Footer from '../../shared/Footer';

const UpdateCompany = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const { singleCompany, error } = useSelector(store => store.company);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    description: "",
    companyLogo: null,
    companyLocation: "",
    companyWebsite: ""
  });

  const [logoPreview, setLogoPreview] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, file });
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("companyName", formData.companyName);
    data.append("description", formData.description);
    data.append("companyLocation", formData.companyLocation);
    data.append("companyWebsite", formData.companyWebsite);
    if (formData.file) {
      data.append("file", formData.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        dispatch(setSuccessMessage(res.data.message));
        navigate("/recruiter/companies");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singleCompany) {
      setFormData({
        companyName: singleCompany.companyName || "",
        description: singleCompany.description || "",
        companyLocation: singleCompany.companyLocation || "",
        companyWebsite: singleCompany.companyWebsite || "",
        companyLogo: null
      });
      if (singleCompany.companyLogo) {
        setLogoPreview(singleCompany.companyLogo);
      }
    }
  }, [singleCompany]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(setSuccessMessage(""));
    }
  }, [error, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-50 via-white to-emerald-100 flex flex-col">
      <NavBar />
      <div className="flex-1 w-full px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800 transition mb-6 group"
          >
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition" />
            <span className="text-sm sm:text-base font-medium">Back to Companies</span>
          </button>

          <div className="bg-teal-50 rounded-2xl shadow-lg p-5 sm:p-8 border border-gray-100">
            <h2 className="text-xl sm:text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Edit Company
              </span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {['companyName', 'description', 'companyLocation', 'companyWebsite'].map((field) => (
                  <div key={field} className="space-y-2">
                    <label htmlFor={field} className="text-sm font-medium text-gray-700">
                      {field === 'companyName' ? 'Company Name' : field === 'description' ? 'Description' : field === 'companyLocation' ? 'Location' : 'Website'}
                      {(field !== 'companyWebsite') && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {field === 'description' ? (
                      <textarea
                        id={field}
                        name={field}
                        rows={4}
                        required={field !== 'companyWebsite'}
                        value={formData[field]}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    ) : (
                      <input
                        type={field === 'companyWebsite' ? 'url' : 'text'}
                        id={field}
                        name={field}
                        required={field !== 'companyWebsite'}
                        value={formData[field]}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    )}
                  </div>
                ))}

                <div className="space-y-2">
                  <label htmlFor="file" className="text-sm font-medium text-gray-700">Logo</label>
                  {logoPreview && (
                    <div className="mb-3 flex items-center space-x-4">
                      <img src={logoPreview} alt="Logo Preview" className="h-20 w-20 object-cover rounded-lg border" />
                      <span className="text-sm text-gray-500">Preview</span>
                    </div>
                  )}

                  <label className="flex flex-col items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50">
                    <svg className="w-6 h-6 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                    <input id="file" name="file" type="file" className="hidden" onChange={handleLogoChange} accept="image/*" />
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row justify-end items-center gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="relative flex items-center justify-center px-6 py-2 text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg shadow disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <span>💾 Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateCompany;
