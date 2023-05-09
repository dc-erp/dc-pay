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
export const fetchData = createAsyncThunk('appMenuLevelOne/fetchData', async (params: any) => {
  const response = await apiRequest.get(`settings/general-setup/menu-setup/menu-level-one`, { params })
  console.log(response.data, "hello")
  
return response.data
})

// ** Add menuLevelOne
export const addMenuLevelOne = createAsyncThunk(
  'appMenuLevelOne/addMenuLevelOne',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await apiRequest.post(`settings/general-setup/menu-setup/menu-level-one`, { data })
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)

// ** Delete User
export const deleteMenuLevelOne = createAsyncThunk(
  'appMenuLevelOne/deleteMenuLevelOne',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await apiRequest.delete(`settings/general-setup/menu-setup/menu-level-one/${id}`)
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)

// ** Edit User
export const editMenuLevelOne = createAsyncThunk(
  'appMenuLevelOne/editMenuLevelOne',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await apiRequest.put(`settings/general-setup/menu-setup/menu-level-one`, { data })
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)


export const appMenuLevelOneSlice = createSlice({
  name: 'appMenuLevelOne',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.menuLevelOne
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appMenuLevelOneSlice.reducer
