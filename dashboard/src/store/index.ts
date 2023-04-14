// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import chat from 'src/store/apps/chat'

// import user from 'src/store/apps/user'
import email from 'src/store/apps/email'
import invoice from 'src/store/apps/invoice'
import calendar from 'src/store/apps/calendar'
import permissions from 'src/store/apps/permissions'


// ** Settings - User Management 
import role from 'src/store/apps/Settings/UserManagement/Roles'
import user from 'src/store/apps/Settings/UserManagement/Users'



export const store = configureStore({
  reducer: {
    chat,
    email,
    invoice,
    calendar,
    permissions,


    // ** Settings - User Management
    role,
    user
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
