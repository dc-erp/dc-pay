// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Utils Imports
import apiRequest from 'src/utils/apiRequest'



interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Holidays
export const fetchData = createAsyncThunk('appHolidays/fetchData', async (params: any) => {
  const response = await apiRequest.get(`settings/general-setup/holiday`, { params })
  
return response.data
})

// ** Add User
export const addHoliday = createAsyncThunk(
  'appHolidays/addHoliday',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await apiRequest.post(`settings/general-setup/holiday`, { data })
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)

// ** Delete User
export const deleteHoliday = createAsyncThunk(
  'appHolidays/deleteHoliday',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await apiRequest.delete(`settings/general-setup/holiday/${id}`)
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)

// ** Edit User
export const editHoliday = createAsyncThunk(
  'appHolidays/editHoliday',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await apiRequest.put(`settings/general-setup/holiday`, { data })
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)


export const appHolidaysSlice = createSlice({
  name: 'appHolidays',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.holidays
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appHolidaysSlice.reducer
