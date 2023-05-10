// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


// ** Utils Imports
import apiRequest from 'src/utils/apiRequest'


// ** Fetch Branches
export const fetchData = createAsyncThunk('appPayrollDisplay/fetchData', async (params: any) => {
  const response = await apiRequest.get(`reports/payroll-display`, { params })
  
return response.data
})


export const appPayrollDisplaySlice = createSlice({
  name: 'appPayrollDisplay',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.payrollDisplay
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appPayrollDisplaySlice.reducer
