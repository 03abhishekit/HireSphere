


import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-emerald-100 via-white to-emerald-200 text-gray-800 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-blue-600 p-2 rounded-md">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-blue-900">CareerConnect</span>
            </div>
            <p className="text-gray-600 text-sm mb-3">Your gateway to professional opportunities</p>
            <div className="flex space-x-3">
              {['facebook', 'linkedin', 'twitter'].map((platform, index) => (
                <Link to="#" key={index} className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    {/* Use actual social platform icons for real implementation */}
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Job Seekers Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-blue-700 mb-3">For Job Seekers</h3>
            <ul className="space-y-2">
              {['Show Jobs', 'Salary Trends', 'Career Advice', 'Resume Tools'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-gray-700 hover:text-blue-600 text-sm flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Employers Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-blue-700 mb-3">For Employers</h3>
            <ul className="space-y-2">
              {['Post Jobs', 'Browse Candidates', 'Pricing Plans', 'HR Solutions'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-gray-700 hover:text-blue-600 text-sm flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-blue-700 mb-3">Stay Updated</h3>
            <p className="text-gray-600 text-sm mb-3">Get the latest job opportunities and career tips</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email"
                placeholder="Your email"
                className="px-3 py-2 text-sm rounded-md text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-md transition shadow-sm w-full sm:w-auto">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-blue-300 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 gap-4">
          <p>© {new Date().getFullYear()} CareerConnect. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Privacy Policy', 'Terms of Service', 'Cookie Settings', 'Accessibility'].map((item) => (
              <Link key={item} to="#" className="hover:text-blue-600 transition">{item}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
