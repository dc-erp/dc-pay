// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Utils Imports
import apiRequest from 'src/utils/apiRequest'


interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Branches
export const fetchData = createAsyncThunk('appTransactionParameterCalculations/fetchData', async (params: any) => {
  const response = await apiRequest.get(`utilities/transaction-parameter-calculation`, { params })
  
return response.data
})

// ** Add User
export const addTransactionParameterCalculation = createAsyncThunk(
  'appTransactionParameterCalculations/addTransactionParameterCalculation',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await apiRequest.post(`utilities/transaction-parameter-calculation`, { data })
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)

// ** Delete User
export const deleteTransactionParameterCalculation = createAsyncThunk(
  'appTransactionParameterCalculations/deleteTransactionParameterCalculation',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await apiRequest.delete(`utilities/transaction-parameter-calculation/${id}`)
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)

// ** Edit User
export const editTransactionParameterCalculation = createAsyncThunk(
  'appTransactionParameterCalculations/editTransactionParameterCalculation',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await apiRequest.put(`utilities/transaction-parameter-calculation`, { data })
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)


export const appTransactionParameterCalculationsSlice = createSlice({
  name: 'appTransactionParameterCalculations',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.transactionParameterCalculation
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appTransactionParameterCalculationsSlice.reducer
