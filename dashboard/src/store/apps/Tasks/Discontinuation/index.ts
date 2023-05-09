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
export const fetchData = createAsyncThunk('appDiscontinuations/fetchData', async (params: any) => {
  const response = await apiRequest.get(`tasks/discontinuation`, { params })
  
return response.data
})

// ** Add User
export const addDiscontinuation = createAsyncThunk(
  'appDiscontinuations/addDiscontinuation',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await apiRequest.post(`tasks/discontinuation`, { data })
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)

// ** Delete User
export const deleteDiscontinuation = createAsyncThunk(
  'appDiscontinuations/deleteDiscontinuation',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await apiRequest.delete(`tasks/discontinuation/${id}`)
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)

// ** Edit User
export const editDiscontinuation = createAsyncThunk(
  'appDiscontinuations/editDiscontinuation',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await apiRequest.put(`tasks/discontinuation`, { data })
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)


export const appDiscontinuationsSlice = createSlice({
  name: 'appDiscontinuations',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.discontinuation
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appDiscontinuationsSlice.reducer
