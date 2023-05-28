// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Utils Imports
import apiRequest from 'src/utils/apiRequest'


interface Redux {
  getState: any
  dispatch: Dispatch<any>
}



// ** Fetch menuLevelTwo
export const fetchData = createAsyncThunk('appMenuLevelTwo/fetchData', async (params: any) => {
  const response = await apiRequest.get(`settings/general-setup/menu-setup/menu-level-two`, { params })
  
return response.data
})

// ** Add menuLevelTwo
export const addMenuLevelTwo = createAsyncThunk(
  'appMenuLevelTwo/addMenuLevelTwo',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await apiRequest.post(`settings/general-setup/menu-setup/menu-level-two`, { data })
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)

// ** Delete User
export const deleteMenuLevelTwo = createAsyncThunk(
  'appMenuLevelTwo/deleteMenuLevelTwo',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await apiRequest.delete(`settings/general-setup/menu-setup/menu-level-two/${id}`)
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)

// ** Edit User
export const editMenuLevelTwo = createAsyncThunk(
  'appMenuLevelTwo/editMenuLevelTwo',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await apiRequest.put(`settings/general-setup/menu-setup/menu-level-two`, { data })
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)


export const appMenuLevelTwoSlice = createSlice({
  name: 'appMenuLevelTwo',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.menuLevelTwo
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appMenuLevelTwoSlice.reducer
