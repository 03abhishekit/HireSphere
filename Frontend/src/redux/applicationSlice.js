

// import { createSlice } from "@reduxjs/toolkit";

// const applicationSlice = createSlice({
//   name: 'application',
//   initialState: {
//     applicants: null,
//     appliedJobs: null,
//     loading: false,
//     error: null,
//     statusUpdate: null
//   },
//   reducers: {
//     setAllApplicants: (state, action) => {
//       state.applicants = action.payload;
//     },
//     setAppliedJobs: (state, action) => {
//       state.appliedJobs = action.payload;
//     },
//     updateApplicantStatus: (state, action) => {
//       const { id, status } = action.payload;
//       const applicant = state.applicants.find(app => app._id === id);
//           if (applicant) {
//             applicant.status = status;
//           }
//       if (state.applicants) {
//         state.applicants = state.applicants.map(app => 
//           app._id === id ? { ...app, status } : app
//         );
//       }
//       // Also update in appliedJobs if exists
//       if (state.appliedJobs) {
//         state.appliedJobs = state.appliedJobs.map(app => 
//           app._id === id ? { ...app, status } : app
//         );
//       }
//     },
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//     setError: (state, action) => {
//       state.error = action.payload;
//     },
//     removeAppliedJob: (state, action) => {
//       if (state.appliedJobs) {
//         state.appliedJobs = state.appliedJobs.filter(
//           app => app._id !== action.payload
//         );
//       }
//     },
//   }
// });

// export const { 
//   setAllApplicants, 
//   setAppliedJobs, 
//   updateApplicantStatus,
//   setLoading,
//   setError,
//   removeAppliedJob,
// } = applicationSlice.actions;

// export default applicationSlice.reducer;









import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    applicants: null,
    allAppliedJobs: [],
    loading: false,
    error: null,
}
const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
   
     setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    removeAppliedJob:(state, action)=>{
      if(state.allAppliedJobs){
        state.allAppliedJobs = state.allAppliedJobs.filter(
          applied => applied._id !== action.payload
        );
      }
    },
     setAllApplicants: (state, action) => {
      state.applicants = action.payload;
    },
    updateApplicantStatus:(state, action)=>{
      const {id, status} = action.payload;
      const applicant= state.applicants.find(app => app._id === id);
      if(applicant){
        applicant.status = status;
      }
      if(state.applicants){
        state.applicants = state.applicants.map(app=>
          app._id === id ? {
            ...app, status
          }: app
        );
      }

      if(state.allAppliedJobs){
        state.allAppliedJobs = state.allAppliedJobs.map(app=>
          app._id === id ? {...app, status} :app
        );
      }

    },

  }
});

export const { 
  setAllAppliedJobs,
  setError,
  setLoading,
  removeAppliedJob,
  setAllApplicants,
  updateApplicantStatus,
  
} = applicationSlice.actions;

export default applicationSlice.reducer;