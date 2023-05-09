// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


// ** Utils Imports
import apiRequest from 'src/utils/apiRequest'



interface Redux {
  getState: any
  dispatch: Dispatch<any>
}


// ** Fetch Transaction Definition By Transaction Group
export const fetchTransactionDefinitionByGroup = createAsyncThunk('appTransactionDefinition/fetchData', async (params: any) => {
  const response = await apiRequest.get(`file/transaction-definition/group`, { params })
  
return response.data
})


// ** Fetch Branches
export const fetchData = createAsyncThunk('appTransactionDefinition/fetchData', async (params: any) => {
  const response = await apiRequest.get(`file/transaction-definition`, { params })
  
return response.data
})

// ** Add User
export const addTransactionDefinition = createAsyncThunk(
  'appTransactionDefinition/addTransactionDefinition',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await apiRequest.post(`file/transaction-definition`, { data })
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)

// ** Delete User
export const deleteTransactionDefinition = createAsyncThunk(
  'appTransactionDefinition/deleteTransactionDefinition',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await apiRequest.delete(`file/transaction-definition/${id}`)
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)

// ** Edit User
export const editTransactionDefinition = createAsyncThunk(
  'appTransactionDefinition/editTransactionDefinition',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await apiRequest.put(`file/transaction-definition`, { data })
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)


export const appTransactionDefinitionSlice = createSlice({
  name: 'appTransactionDefinition',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.transactionDefinition
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appTransactionDefinitionSlice.reducer
