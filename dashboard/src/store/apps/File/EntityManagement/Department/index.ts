// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


// ** Utils Imports
import apiRequest from 'src/utils/apiRequest'


interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Departments
export const fetchData = createAsyncThunk('appDepartments/fetchData', async (params: any) => {
  const response = await apiRequest.get(`file/entity-management/department`, { params })
  console.log(response)
  
return response.data
})

// ** Add User
export const addDepartment = createAsyncThunk(
  'appDepartments/addDepartment',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await apiRequest.post(`file/entity-management/department`, { data })
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)

// ** Delete User
export const deleteDepartment = createAsyncThunk(
  'appDepartments/deleteDepartment',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await apiRequest.delete(`file/entity-management/department/${id}`)
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)

// ** Edit User
export const editDepartment = createAsyncThunk(
  'appDepartments/editDepartment',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await apiRequest.put(`file/entity-management/department`, { data })
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)


export const appDepartmentsSlice = createSlice({
  name: 'appDepartments',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.department
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appDepartmentsSlice.reducer
