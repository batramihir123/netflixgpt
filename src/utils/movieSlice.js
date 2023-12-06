import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice ({
      name:"movie",
      initialState:{
        nowPlayingMovies:null,
        trailerVideo:null,
        popularMovies:null,
        topratedMovies:null,
        upcomingMovies:null,
      },
      reducers:{
        addNowPlayingMovies: (state,action) =>{
            state.nowPlayingMovies=action.payload;
        },
        addTrailerVideo:(state,action) =>{
          state.trailerVideo=action.payload;
        },
        addPopularMovies:(state,action) =>{
          state.popularMovies=action.payload;
        },
        addTopRatedMovies:(state,action) =>{
          state.topratedMovies=action.payload;
        },
        addUpcomingMovies:(state,action) =>{
          state.upcomingMovies=action.payload;
        },
      },
});


export const {addNowPlayingMovies , addTrailerVideo,addPopularMovies,addTopRatedMovies,addUpcomingMovies,addalltrailervideo} = movieSlice.actions;

export default movieSlice.reducer;