import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: null, class: null },
  reducers: {
    setNotification: (state, action) => {
      alert = action.payload
      state.message = alert.message
      state.class = alert.class
    },
    removeNotification(state) {
      state.message = null
      state.class = null
    }
  },
})

export const { setNotification, removeNotification } = notificationSlice.actions

export const showNotification = ( notification, timeout ) => {
  return dispatch => {
    dispatch(setNotification(notification))
    setTimeout(() => {
      dispatch(removeNotification())
    }, timeout*1000)         

  }
}

export default notificationSlice.reducer;
