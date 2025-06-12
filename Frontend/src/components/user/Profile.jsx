import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../shared/NavBar';
import { Download, Edit2, Mail, Phone } from 'lucide-react';
import UpdateProfile from './UpdateProfile';
import AppliedJobTable from '../AppliedJobTable';
import Footer from '../shared/Footer';

const isResume = true;

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-emerald-100 to-emerald-200">
      <NavBar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Profile Card */}
        <div className="bg-teal-50 shadow-xl rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between gap-6 items-start sm:items-center">
            <div className="flex flex-col sm:flex-row items-center gap-6 w-full">
              <img
                src={
                  user?.profile?.profilePhoto ||
                  'https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg'
                }
                alt="Profile"
                className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full border-4 border-emerald-500 shadow"
              />

              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  {user?.userName || 'Unknown'}
                </h1>
                <p className="text-gray-600 mt-2 max-w-md text-justify">
                  {user?.profile?.bio || 'Please add a bio to introduce yourself'}
                </p>
              </div>
            </div>

             <button
                onClick={() => setOpen(true)}
                className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base transition-all whitespace-nowrap"
              >
                <Edit2 className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Update Profile</span>
              </button>

          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
             <div className="flex items-center bg-emerald-50 p-3 rounded-lg shadow-sm">
              <Mail className="text-emerald-600 w-5 h-5 flex-shrink-0 mr-3" />
              <span className="text-gray-700 text-sm sm:text-base break-all">
                {user?.email || 'Email not provided'}
              </span>
            </div>

            <div className="flex items-center space-x-3 bg-emerald-50 p-3 rounded-lg shadow-sm">
              <Phone className="text-emerald-600 w-5 h-5" />
              <span className="text-gray-700">{user?.phoneNumber || 'Phone not provided'}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Skills & Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills?.length > 0 ? (
                user.profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-gray-500 italic">No skills added yet</p>
              )}
            </div>
          </div>

          {/* Resume */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Resume</h3>
            {isResume ? (
              <div className="flex items-center gap-3">
                <a
                  href={user?.profile?.resume}
                  download={user?.profile?.resumeOriginalName || 'resume'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-700 hover:text-emerald-900 transition-colors"
                >
                  <span className="font-medium">
                    {user?.profile?.resumeOriginalName || 'Download Resume'}
                  </span>
                  <Download className="w-5 h-5" />
                </a>
              </div>
            ) : (
              <p className="text-gray-500 italic">No resume uploaded</p>
            )}
          </div>
        </div>

        {/* Applied Jobs */}
        <div className="bg-teal-50 shadow-xl rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Applied Jobs</h2>
          <AppliedJobTable />
        </div>
      </div>

      <UpdateProfile open={open} setOpen={setOpen} />
      <Footer />
    </div>
  );
};

export default Profile;
