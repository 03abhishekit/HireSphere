// import { createSlice } from "@reduxjs/toolkit";

// const companySlice = createSlice({
//     name: "company",
//     initialState: {
//         companies: [],             
//         singleCompany: null,       
//         loading: false,
//         error: null,
//         searchCompanyByText: "",   
//         successMessage: "",        
//     },
//     reducers: {
//         setCompanies: (state, action) => {
//             state.companies = action.payload;
//         },
//         setSingleCompany: (state, action) => {
//             state.singleCompany = action.payload;
//         },
//         setSearchCompanyByText: (state, action) => {
//             state.searchCompanyByText = action.payload;
//         },
//         setLoading: (state, action) => {
//             state.loading = action.payload;
//         },
//         setError: (state, action) => {
//             state.error = action.payload;
//         },
//         setSuccessMessage: (state, action) => {
//             state.successMessage = action.payload;
//         },
//         clearMessages: (state) => {
//             state.error = null;
//             state.successMessage = "";
//         }
//     },
// });

// export const {
//     setCompanies,
//     setSingleCompany,
//     setSearchCompanyByText,
//     setLoading,
//     setError,
//     setSuccessMessage,
//     clearMessages,
// } = companySlice.actions;

// export default companySlice.reducer;



import { createSlice } from "@reduxjs/toolkit";

const initialState = {
       singleCompany: null, 
       companies: [],  
       loading: false,
       error: null,
       searchCompanyByText: "",   
       successMessage: "",
}
const companySlice = createSlice({
    name: "company",
    initialState,
    reducers: {
       setSingleCompany: (state, action) => {
            state.singleCompany = action.payload;
        },
        setCompanies: (state, action) => {
            state.companies = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setSuccessMessage: (state, action) => {
            state.successMessage = action.payload;
        },
        setSearchCompanyByText: (state, action) => {
            state.searchCompanyByText = action.payload;
        },
         clearMessages: (state) => {
            state.error = null;
            state.successMessage = "";
        },
    },
});

export const {
    setSingleCompany,
    setCompanies,
    setError,
    setLoading,
    setSuccessMessage,
    setSearchCompanyByText,
    clearMessages,

} = companySlice.actions;

export default companySlice.reducer;
