

// import React, { useEffect, useState } from 'react';
// import { ArrowLeft, Loader2 } from 'lucide-react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import useGetCompanyById from '../../../hooks/useGetCompanyById';
// import { setSingleCompany, setSuccessMessage } from '../../../redux/companySlice';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import NavBar from '../../shared/NavBar';
// import { COMPANY_API_END_POINT } from '../../../utils/constant';
// import Footer from '../../shared/Footer';

// const UpdateCompany = () => {
//     const params = useParams();
    
//     useGetCompanyById(params.id);
//     const { singleCompany, error } = useSelector(store => store.company);
//     const dispatch = useDispatch();
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         companyName: "",
//         description: "",
//         companyLogo: null,
//         companyLocation: "",
//         companyWebsite: ""
//     });

//     const [logoPreview, setLogoPreview] = useState("");

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleLogoChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setFormData({ ...formData, file });
//             setLogoPreview(URL.createObjectURL(file));
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const data = new FormData();
//         data.append("companyName", formData.companyName);
//         data.append("description", formData.description);
//         data.append("companyLocation", formData.companyLocation);
//         data.append("companyWebsite", formData.companyWebsite);
//         if (formData.file) {
//             data.append("file", formData.file);
//         }

//         try {
//             setLoading(true);
//             const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, data, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//                 withCredentials: true
//             });
//             console.log(res);
//             if (res?.data?.success) {
//                 dispatch(setSingleCompany(res.data.company));
//                 dispatch(setSuccessMessage(res.data.message));
//                 navigate("/recruiter/companies");
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response?.data?.message || "Something went wrong");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (singleCompany) {
//             setFormData({
//                 companyName: singleCompany.companyName || "",
//                 description: singleCompany.description || "",
//                 companyLocation: singleCompany.companyLocation || "",
//                 companyWebsite: singleCompany.companyWebsite || "",
//                 companyLogo: null
//             });
//             if (singleCompany.companyLogo) {
//                 setLogoPreview(singleCompany.companyLogo);
//             }
//         }
//     }, [singleCompany]);

//     useEffect(() => {
//         if (error) {
//             toast.error(error);
//             dispatch(setSuccessMessage(""));
//         }
//     }, [error, dispatch]);

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
//             <NavBar />
//             <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                 <div className="max-w-3xl mx-auto">
//                     <button 
//                         onClick={() => navigate(-1)}
//                         className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 mb-6 group"
//                     >
//                         <ArrowLeft 
//                             size={20} 
//                             className="mr-1 transition-transform duration-200 group-hover:-translate-x-1" 
//                         />
//                         <span className="font-medium">Back to Companies</span>
//                     </button>

//                     <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100">
//                         <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
//                             <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//                                 Edit Company
//                             </span>
//                         </h2>
                        
//                         <form onSubmit={handleSubmit} className="space-y-6">
//                             <div className="grid grid-cols-1 gap-6">
//                                 <div className="space-y-2">
//                                     <label 
//                                         className="block text-sm font-medium text-gray-700 mb-1"
//                                         htmlFor="companyName"
//                                     >
//                                         Company Name <span className="text-red-500">*</span>
//                                     </label>
//                                     <input
//                                         type="text"
//                                         id="companyName"
//                                         name="companyName"
//                                         value={formData.companyName}
//                                         onChange={handleChange}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
//                                         required
//                                     />
//                                 </div>

//                                 <div className="space-y-2">
//                                     <label 
//                                         className="block text-sm font-medium text-gray-700 mb-1"
//                                         htmlFor="description"
//                                     >
//                                         Description <span className="text-red-500">*</span>
//                                     </label>
//                                     <textarea
//                                         id="description"
//                                         name="description"
//                                         value={formData.description}
//                                         onChange={handleChange}
//                                         rows={4}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
//                                         required
//                                     />
//                                 </div>

//                                 <div className="space-y-2">
//                                     <label 
//                                         className="block text-sm font-medium text-gray-700 mb-1"
//                                         htmlFor="companyLocation"
//                                     >
//                                         Location <span className="text-red-500">*</span>
//                                     </label>
//                                     <input
//                                         type="text"
//                                         id="companyLocation"
//                                         name="companyLocation"
//                                         value={formData.companyLocation}
//                                         onChange={handleChange}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
//                                         required
//                                     />
//                                 </div>

//                                 <div className="space-y-2">
//                                     <label 
//                                         className="block text-sm font-medium text-gray-700 mb-1"
//                                         htmlFor="companyWebsite"
//                                     >
//                                         Website
//                                     </label>
//                                     <input
//                                         type="url"
//                                         id="companyWebsite"
//                                         name="companyWebsite"
//                                         value={formData.companyWebsite}
//                                         onChange={handleChange}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
//                                         placeholder="https://example.com"
//                                     />
//                                 </div>

//                                 <div className="space-y-2">
//                                     <label 
//                                         className="block text-sm font-medium text-gray-700 mb-1"
//                                         htmlFor="file"
//                                     >
//                                         Logo
//                                     </label>
//                                     {logoPreview && (
//                                         <div className="mb-3 flex items-center space-x-4">
//                                             <img 
//                                                 src={logoPreview} 
//                                                 alt="Current logo" 
//                                                 className="h-20 w-20 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
//                                             />
//                                             <span className="text-sm text-gray-500">New preview</span>
//                                         </div>
//                                     )}
//                                     <div className="flex items-center justify-center w-full">
//                                         <label className="flex flex-col w-full border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded-lg cursor-pointer transition-all duration-200">
//                                             <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
//                                                 <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
//                                                 </svg>
//                                                 <p className="mb-2 text-sm text-gray-500 text-center">
//                                                     <span className="font-semibold">Click to upload</span> or drag and drop
//                                                 </p>
//                                                 <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 5MB)</p>
//                                             </div>
//                                             <input 
//                                                 id="file" 
//                                                 name="file" 
//                                                 type="file" 
//                                                 className="hidden" 
//                                                 onChange={handleLogoChange}
//                                                 accept="image/*"
//                                             />
//                                         </label>
//                                     </div>
//                                 </div>

//                                 <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
//                                     <button
//                                         type="button"
//                                         onClick={() => navigate(-1)}
//                                         className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-200 font-medium shadow-sm hover:shadow-md"
//                                     >
//                                         Cancel
//                                     </button>
//                                     <button
//                                         type="submit"
//                                         disabled={loading}
//                                         className="relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200 disabled:opacity-70 font-medium shadow-md hover:shadow-lg overflow-hidden"
//                                     >
//                                         {loading ? (
//                                             <>
//                                                 <Loader2 className="animate-spin h-5 w-5" />
//                                                 <span>Saving...</span>
//                                             </>
//                                         ) : (
//                                             <>
//                                                 <span className="z-10 flex items-center space-x-2">
//                                                     <span>💾</span>
//                                                     <span>Save Changes</span>
//                                                 </span>
//                                                 <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 hover:opacity-100 transition-opacity duration-200"></span>
//                                             </>
//                                         )}
//                                     </button>
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// };

// export default UpdateCompany ;





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
