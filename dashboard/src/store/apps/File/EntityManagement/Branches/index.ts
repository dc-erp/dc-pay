// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


// ** Utils Imports
import apiRequest from 'src/utils/apiRequest'


interface DataParams {
  q: string
  role: string
  status: string
  currentPlan: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

export const fetchRoleBranches = createAsyncThunk('appRights/fetchData', async (params: any) => {
  const response = await apiRequest.get(`roleBranch`, { params })
  
return response.data
})

// ** Fetch Branches
export const fetchData = createAsyncThunk('appBranches/fetchData', async (params: any) => {
  const response = await apiRequest.get(`file/entity-management/branch`, { params })
  
return response.data
})

// ** Add User
export const addBranch = createAsyncThunk(
  'appBranches/addBranch',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await apiRequest.post(`file/entity-management/branch`, { data })
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)

// ** Delete User
export const deleteBranch = createAsyncThunk(
  'appBranches/deleteBranch',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await apiRequest.delete(`file/entity-management/branch/${id}`)
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)

// ** Edit User
export const editBranch = createAsyncThunk(
  'appBranches/editBranch',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await apiRequest.put(`file/entity-management/branch`, { data })
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)


export const appBranchesSlice = createSlice({
  name: 'appBranches',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.branch
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appBranchesSlice.reducer
