import { createSlice } from '@reduxjs/toolkit'

export const detailsSlice = createSlice({
  name: 'details',
  initialState : {
    movie:{},
    show:{}
  },
  reducers: {
    getMovieData: (state, action) =>{
             state.movie = action.payload;
    },
    getShowData: (state, action) =>{
             state.show = action.payload;
    }

  },
})

// Action creators are generated for each case reducer function
export const { getMovieData,getShowData} = detailsSlice.actions

export default detailsSlice.reducer