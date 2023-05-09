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
export const fetchData = createAsyncThunk('appPayTransactions/fetchData', async (params: any) => {
  const response = await apiRequest.get(`tasks/pay-transaction`, { params })
  
return response.data
})

// ** Add User
export const addPayTransaction = createAsyncThunk(
  'appPayTransactions/addPayTransaction',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await apiRequest.post(`tasks/pay-transaction`, { data })
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)

// ** Delete User
export const deletePayTransaction = createAsyncThunk(
  'appPayTransactions/deletePayTransaction',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await apiRequest.delete(`tasks/pay-transaction/${id}`)
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)

// ** Edit User
export const editPayTransaction = createAsyncThunk(
  'appPayTransactions/editPayTransaction',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await apiRequest.put(`tasks/pay-transaction`, { data })
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)


export const appPayTransactionsSlice = createSlice({
  name: 'appPayTransactions',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.payTransaction
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appPayTransactionsSlice.reducer
