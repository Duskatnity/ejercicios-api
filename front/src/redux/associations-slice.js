import { createSlice } from '@reduxjs/toolkit'

export const associationSlice = createSlice({
  name: 'associations',
  initialState: {
    associations: []
  },
  reducers: {
    addProduct: (state, action) => {
      const association = state.associations.some(association => association.id === action.payload.id)

      if (!association) {
        state.associations.push(action.payload)
      } else {
        state.associations = state.associations.map(association => {
          if (association.id === action.payload.id) {
            association.quantity = action.payload.quantity
          }
          return association
        })
      }
    },
    removeProduct: (state, action) => {
      state.associations = state.associations.filter(association => association.id !== action.payload.id)
    }
  }
})

export const { addProduct, removeProduct } = associationSlice.actions

export default associationSlice.reducer
