








// import { createSlice, createSelector } from '@reduxjs/toolkit';

// const initialState = {
//   allJobs: [],
//   filteredJobs: [],
//   error: null,
//   allAdminJobs: [],
//   singleJob: null,
//   searchJobByText: '',
//   allAppliedJobs: [],
 
//   isLoading: false,
//   filters: {
//     employmentType: '',
//     jobLocation: '',
//     experienceLevel: '',
//     salaryRange: '',
//   }
  
// };

// const jobSlice = createSlice({
//   name: 'job',
//   initialState,
//   reducers: {
//     setAllJobs: (state, action) => {
//       state.allJobs = action.payload;
//       state.isLoading = false;
      
//     },
//     setError: (state, action) => {
//       state.error = action.payload;
//       state.isLoading = false;
//     },
//     setAllAdminJobs: (state, action) => {
//       state.allAdminJobs = action.payload;
//       state.isLoading = false;
//     },
//     setSingleJob: (state, action) => {
//       state.singleJob = action.payload;
//       state.isLoading = false;
//     },
//     setAllAppliedJobs: (state, action) => {
//       state.allAppliedJobs = action.payload;
//       state.isLoading = false;
//     },
//      setFilteredJobs: (state, action) => {
//       state.filteredJobs = action.payload;
//     },
//     setSearchJobByText: (state, action) => {
//       state.searchJobByText = action.payload;
//     },
//     setFilters: (state, action) => {
//       state.filters = { ...state.filters, ...action.payload };
//     },
//     resetFilters: (state) => {
//       state.filters = initialState.filters;
//       state.searchJobByText = '';
//     },
//     setLoading:(state, action)=>{
//       state.isLoading = action.payload
//     },
//     updateJob: (state, action) => {
//       const updatedJob = action.payload;
//       state.allJobs = state.allJobs.map(job => 
//         job._id === updatedJob._id ? updatedJob : job
//       );
//       state.allAdminJobs = state.allAdminJobs.map(job => 
//         job._id === updatedJob._id ? updatedJob : job
//       );
//       if (state.singleJob?._id === updatedJob._id) {
//         state.singleJob = updatedJob;
//       }
//     },
//     deleteJob: (state, action) => {
//       const id = action.payload;
//       state.allJobs = state.allJobs.filter(job => job._id !== id);
//       state.allAdminJobs = state.allAdminJobs.filter(job => job._id !== id);
//       if (state.singleJob?._id === id) {
//         state.singleJob = null;
//       }
//     },

//     // jobSlice.js
// updateJobApplications: (state, action) => {
//   const { jobId, applicationId } = action.payload;
  
//   // Update allAppliedJobs
//   state.allAppliedJobs = state.allAppliedJobs.filter(
//     app => app._id !== applicationId
//   );
  
//   // Update single job if exists
//   if (state.singleJob && state.singleJob._id === jobId) {
//     state.singleJob.applications = state.singleJob.applications.filter(
//       app => app._id !== applicationId
//     );
//   }
// },
//   },
// });







// export const selectFilteredJobs = createSelector(
//   [
//     state => state.job.allJobs,
//     state => state.job.searchJobByText,
//     state => state.job.filters
//   ],
//   (allJobs, searchTerm, filters) => {
//     let filtered = [...allJobs];
    
//     // Apply search filter
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       filtered = filtered.filter(job => 
//         job.jobTitle.toLowerCase().includes(term) ||
//         job.description.toLowerCase().includes(term) ||
//         (job.company?.companyName?.toLowerCase().includes(term)) ||
//         job.jobLocation.toLowerCase().includes(term)
//       );
//     }


//     Object.entries(filters).forEach(([key, value]) => {
//       if (value) {
//         filtered = filtered.filter(job => {
//           if (key === 'salaryRange') {
//             const [minStr, maxStr] = value.split(' - ');
//             const min = Number(minStr);
//             const max = maxStr ? Number(maxStr) : Infinity;
//             const jobSalary = Number(job.salary);
//             return jobSalary >= min && jobSalary <= max;
//           }
//           return job[key] === value;
//         });
//       }
//     });

//     return filtered;
//   }
// );


// export const {
//   setAllJobs,
//   setError,
//   setAllAdminJobs,
//   setSingleJob,
//   setAllAppliedJobs,
//   setSearchJobByText,
//   setFilters,
//   setLoading,
//   updateJob,
//   deleteJob,
//   resetFilters,
//   setFilteredJobs,
//   updateJobApplications,
// } = jobSlice.actions;

// export default jobSlice.reducer;




















import { createSlice, createSelector } from '@reduxjs/toolkit';
;

const initialState = {
      searchJobByText: '', 
      allJobs : [] ,
      error: null,
      allAdminJobs:[],
      singleJob : null,
      isLoading: false,
       filters: {
          employmentType: '',
          jobLocation: '',
          experienceLevel: '',
          salary: '',
          salaryType:'',
        },

};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    //   use for search Job by Text and Other task
    setSearchJobByText : (state, action)=>{
       state.searchJobByText = action.payload;
    },

    //  used For filter the the job
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.searchJobByText = '';
    },

    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
      state.isLoading = false;
      
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setLoading:(state, action)=>{
      state.isLoading = action.payload
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
      state.isLoading = false;
    },
    updateJob : (state, action)=>{
      const updatedJob = action.payload;
      state.allJobs = state.allJobs.map(job =>
        job._id === updatedJob._id ? updatedJob : job
      );
      state.allAdminJobs = state.allAdminJobs.map(job =>
         job._id === updatedJob._id ? updatedJob : job
      );
      if(state.singleJob?._id === updatedJob._id){
        state.singleJob = updatedJob;
      }
    },
    deleteJob: (state, action)=>{
      const id = action.payload;
      state.allJobs = state.allJobs.filter(job=> job._id !== id);
      state.allAdminJobs = state.allAdminJobs.filter(job=> job._id !== id);
      if (state.singleJob?._id === id) {
        state.singleJob = null;
      }
    },
     setSingleJob: (state, action) => {
      state.singleJob = action.payload;
      state.isLoading = false;
    },

  },
});



export const selectFilteredJobs = createSelector(
  [
    state => state.job.allJobs,
    state => state.job.searchJobByText,
    state => state.job.filters
  ],
  (allJobs, searchTerm, filters )=>{
    let filtered = [...allJobs];

      if(searchTerm){
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(job =>
          job.jobTitle.toLowerCase().includes(term) || 
           job.description.toLowerCase().includes(term) ||
            (job.company?.companyName?.toLowerCase().includes(term)) ||
             job.jobLocation.toLowerCase().includes(term)
        );
      }

      Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter(job => {
          if (key === 'salary') {
            const [minStr, maxStr] = value.split(' - ');
            const min = Number(minStr);
            const max = maxStr ? Number(maxStr) : Infinity;
            const jobSalary = Number(job.salary);
            return jobSalary >= min && jobSalary <= max;
          }
          return job[key] === value;
        });
      }
    });
    return filtered;

  }
)





   


export const {
  setSearchJobByText,
  setFilters,
  resetFilters,
  setAllJobs,
  setError,
  setLoading,
  setAllAdminJobs,
  updateJob,
  deleteJob,
  setSingleJob,
  
} = jobSlice.actions;

export default jobSlice.reducer;













