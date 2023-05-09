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
export const fetchData = createAsyncThunk('appTaxRates/fetchData', async (params: any) => {
  const response = await apiRequest.get(`utilities/tax-rate`, { params })
  
return response.data
})

// ** Add User
export const addTaxRate = createAsyncThunk(
  'appTaxRates/addTaxRate',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await apiRequest.post(`utilities/tax-rate`, { data })
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)

// ** Delete User
export const deleteTaxRate = createAsyncThunk(
  'appTaxRates/deleteTaxRate',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await apiRequest.delete(`utilities/tax-rate/${id}`)
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)

// ** Edit User
export const editTaxRate = createAsyncThunk(
  'appTaxRates/editTaxRate',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await apiRequest.put(`utilities/tax-rate`, { data })
    dispatch(fetchData(getState().user.params))
    
return response.data
  }
)


export const appTaxRatesSlice = createSlice({
  name: 'appTaxRates',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.taxRate
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appTaxRatesSlice.reducer
