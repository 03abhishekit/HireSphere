import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { JOB_API_END_POINT } from '../../../utils/constant';
import { deleteJob, setError } from '../../../redux/jobSlice';

const JobDeleteButton = ({ jobId, createdBy, currentUserId }) => {
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, {
        withCredentials: true,
      });

      if (res?.data?.success) {
        dispatch(deleteJob(jobId));
        toast.success('Job deleted successfully 🗑️');
      }
    } catch (error) {
      dispatch(setError(error.response?.data?.message || 'Error deleting job'));
      toast.error(error.response?.data?.message || 'Failed to delete job');
    }
    setShowConfirm(false); 
  };

  if (createdBy !== currentUserId) return null; // Don't render if not owner

  return (
    <div className="relative inline-block">
      {!showConfirm ? (
        <button
          onClick={() => setShowConfirm(true)}
          className="px-4 py-2 text-white bg-red-600 rounded-full hover:bg-red-700 transition-all duration-300 shadow-md text-sm"
          aria-label="Delete job"
        >
          🗑️ Delete
        </button>

      ) : (
        <div className="flex items-center gap-2 bg-red-50 p-2 rounded-md">
          <div className="flex gap-3 mt-2">
        <button
          onClick={handleDelete}
          className="text-xs px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Yes
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          className="text-xs px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          No
        </button>
        </div>

        </div>
      )}
    </div>
  );
};

export default JobDeleteButton;


