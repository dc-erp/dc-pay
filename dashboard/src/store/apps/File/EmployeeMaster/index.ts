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
export const fetchData = createAsyncThunk('appEmployees/fetchData', async (params: any) => {
  const response = await apiRequest.get(`file/employee-master`, { params })
  
return response.data
})

// ** Add User
export const addEmployee = createAsyncThunk(
  'appEmployees/addEmployee',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await apiRequest.post(`file/employee-master`, { data })
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)

// ** Delete User
export const deleteEmployee = createAsyncThunk(
  'appEmployees/deleteEmployee',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await apiRequest.delete(`file/employee-master/${id}`)
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)

// ** Edit User
export const editEmployee = createAsyncThunk(
  'appEmployees/editEmployee',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await apiRequest.put(`file/employee-master`, { data })
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)


export const appEmployeesSlice = createSlice({
  name: 'appEmployees',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.employee
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appEmployeesSlice.reducer
