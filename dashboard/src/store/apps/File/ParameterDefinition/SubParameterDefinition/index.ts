// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


// ** Utils Imports
import apiRequest from 'src/utils/apiRequest'

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch SubPaarameterDefinitions
export const fetchData = createAsyncThunk('appSubParameterDefinitions/fetchData', async (params: any) => {
  const response = await apiRequest.get(`file/parameter-definition/sub-parameter-definition`, { params })
  
return response.data
})

// ** Add User
export const addSubParameterDefinition = createAsyncThunk(
  'appSubParameterDefinitions/addSubParameterDefinition',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await apiRequest.post(`file/parameter-definition/sub-parameter-definition`, { data })
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)

// ** Delete User
export const deleteSubParameterDefinition = createAsyncThunk(
  'appSubParameterDefinitions/deleteSubParameterDefinition',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await apiRequest.delete(`file/parameter-definition/sub-parameter-definition/${id}`)
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)

// ** Edit User
export const editSubParameterDefinition = createAsyncThunk(
  'appSubParameterDefinitions/editSubParameterDefinition',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await apiRequest.put(`file/parameter-definition/sub-parameter-definition`, { data })
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)


export const appSubParameterDefinitionsSlice = createSlice({
  name: 'appSubParameterDefinitions',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.subParameterDefinition
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appSubParameterDefinitionsSlice.reducer
