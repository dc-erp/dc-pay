// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Utils Imports
import apiRequest from 'src/utils/apiRequest'

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Roles
export const fetchData = createAsyncThunk('appRoles/fetchData', async (params: any) => {
  const response = await apiRequest.get(`settings/user-management/roles`, { params })
 
  return response.data
})

// ** Add User
export const addRole = createAsyncThunk(
  'appRoles/addRole',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await apiRequest.post(`settings/user-management/roles`, { data })
    dispatch(fetchData(getState().user.params))
   
    return response.data
  }
)

// ** Delete User
export const deleteRole = createAsyncThunk(
  'appRoles/deleteRole',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await apiRequest.delete(`settings/user-management/roles/${id}`)
    dispatch(fetchData(getState().user.params))
   
    return response.data
  }
)

// ** Edit User
export const editRole = createAsyncThunk(
  'appRoles/editRole',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await apiRequest.put(`roles`, { data })
    dispatch(fetchData(getState().user.params))
    
    return response.data
  }
)


export const appRolesSlice = createSlice({
  name: 'appRoles',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.roles
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appRolesSlice.reducer
