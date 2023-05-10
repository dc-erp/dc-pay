// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Utils Imports
import apiRequest from 'src/utils/apiRequest'


interface Redux {
  getState: any
  dispatch: Dispatch<any>
}



// ** Fetch menuLevelOne
export const fetchData = createAsyncThunk('appBranchRight/fetchData', async (params: any) => {
  const response = await apiRequest.get(`settings/rights-management/branch`, { params })
  
return response.data
})

// ** Edit 
export const editMenuRight = createAsyncThunk(
  'appBranchRight/editBranchRight',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await apiRequest.put(`settings/rights-management/branch`, { data })
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)

// ** Add menuLevelOne
export const addBranchRight = createAsyncThunk(
  'appBranchRight/addBranchRight',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await apiRequest.post(`settings/rights-management/branch`, { data })
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)

// ** Delete User
export const deleteBranchRight = createAsyncThunk(
  'appBranchRight/deleteBranchRight',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await apiRequest.delete(`settings/rights-management/branch/${id}`)
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)

// ** Edit User
export const editBranchRight = createAsyncThunk(
  'appBranchRight/editBranchRight',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await apiRequest.put(`settings/rights-management/branch`, { data })
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)


export const appBranchRightSlice = createSlice({
  name: 'appBranchRight',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.branchRight
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appBranchRightSlice.reducer
