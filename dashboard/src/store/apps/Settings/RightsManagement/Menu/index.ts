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
export const fetchData = createAsyncThunk('appMenuRight/fetchData', async (params: any) => {
  const response = await apiRequest.get(`settings/rights-management/menu`, { params })
  
return response.data
})

// ** Edit 
export const editMenuRight = createAsyncThunk(
  'appMenuRight/editMenuRight',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await apiRequest.put(`settings/rights-management/menu`, { data })
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)

// ** Add menuLevelOne
export const addMenuRight = createAsyncThunk(
  'appMenuRight/addMenuRight',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await apiRequest.post(`settings/rights-management/menu`, { data })
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)

// ** Delete User
export const deleteMenuRight = createAsyncThunk(
  'appMenuRight/deleteMenuRight',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await apiRequest.delete(`settings/rights-management/menu/${id}`)
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)


export const appMenuRightSlice = createSlice({
  name: 'appMenuRight',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.menuRight
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appMenuRightSlice.reducer
