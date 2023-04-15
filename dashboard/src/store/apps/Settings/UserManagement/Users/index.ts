// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Utils Imports
import apiRequest from 'src/utils/apiRequest'

// ** Config
import authConfig from 'src/configs/auth'


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

// ** Fetch Users
export const fetchData = createAsyncThunk('appUsers/fetchData', async (params: DataParams) => {
  const response = await apiRequest.get(`settings/user-management/users`, { params })

  return response.data
})


// ** Add User
export const addUser = createAsyncThunk(
  'appUsers/addUser',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await apiRequest.post(`settings/user-management/users`, { data })
    dispatch(fetchData(getState().user.params))
   
    return response.data
  }
)

// ** Delete User
export const deleteUser = createAsyncThunk(
  'appUsers/deleteUser',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await axios.delete(`${authConfig.dataEndPoint}/settings/user-management/users/${id}`, {
      data: id
    })
    dispatch(fetchData(getState().user.params))
  
    return response.data
  }
)

// ** Edit User
export const editUser = createAsyncThunk(
  'appUsers/editUser',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await axios.put(`${authConfig.dataEndPoint}/settings/user-management/users`, {
      data
    })
    dispatch(fetchData(getState().user.params))
  
    return response.data
  }
)


export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.users
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appUsersSlice.reducer
