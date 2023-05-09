// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Utils Imports
import apiRequest from 'src/utils/apiRequest'


interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch MainParameterDefinitions
export const fetchData = createAsyncThunk('appMainParameterDefinitions/fetchData', async (params: any) => {
  const response = await apiRequest.get(`file/parameter-definition/main-parameter-definition`, { params })
  
return response.data
})

// ** Add User
export const addMainParameterDefinition = createAsyncThunk(
  'appMainParameterDefinitions/addMainParameterDefinition',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await apiRequest.post(`file/parameter-definition/main-parameter-definition`, { data })
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)

// ** Delete User
export const deleteMainParameterDefinition = createAsyncThunk(
  'appMainParameterDefinitions/deleteMainParameterDefinition',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await apiRequest.delete(`file/parameter-definition/main-parameter-definition/${id}`)
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)

// ** Edit User
export const editMainParameterDefinition = createAsyncThunk(
  'appMainParameterDefinitions/editMainParameterDefinition',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await apiRequest.put(`file/parameter-definition/main-parameter-definition`, { data })
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)


export const appMainParameterDefinitionsSlice = createSlice({
  name: 'appMainParameterDefinitions',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.mainParameterDefinition
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appMainParameterDefinitionsSlice.reducer
