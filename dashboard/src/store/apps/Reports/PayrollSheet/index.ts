// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


// ** Utils Imports
import apiRequest from 'src/utils/apiRequest'



// ** Fetch Branches
export const fetchData = createAsyncThunk('appPayrollSheets/fetchData', async (params: any) => {
  const response = await apiRequest.get(`reports/payroll-sheet`, { params })
  
return response.data
})


export const appPayrollSheetsSlice = createSlice({
  name: 'appPayrollSheets',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.payrollSheet
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appPayrollSheetsSlice.reducer
