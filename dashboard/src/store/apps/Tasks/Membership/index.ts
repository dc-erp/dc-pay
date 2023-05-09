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
export const fetchData = createAsyncThunk('appMemberships/fetchData', async (params: any) => {
  const response = await apiRequest.get(`tasks/membership`, { params })
  
return response.data
})

// ** Add User
export const addMembership = createAsyncThunk(
  'appMemberships/addMembership',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await apiRequest.post(`tasks/membership`, { data })
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)

// ** Delete User
export const deleteMembership = createAsyncThunk(
  'appMemberships/deleteMembership',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await apiRequest.delete(`tasks/membership/${id}`)
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)

// ** Edit User
export const editMembership = createAsyncThunk(
  'appMemberships/editMembership',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await apiRequest.put(`tasks/membership`, { data })
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)


export const appMembershipsSlice = createSlice({
  name: 'appMemberships',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.membership
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appMembershipsSlice.reducer
