import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { MovieList } from './MovieList';
import { API_OPTIONS } from '../utils/constant';

export const SecondaryContainer = () => {


  const movies = useSelector((store)=>store.movie);
  return (
     movies && (
      <div className="bg-black">
      <div className=" mt-0 md:-mt-52 pl-4 md:pl-12 relative z-20">
        <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies} />
        <MovieList title={"Top Rated"} movies={movies?.topratedMovies} />
        <MovieList title={"Popular"} movies={movies?.popularMovies} />
        <MovieList title={"Upcoming Movies"} movies={movies?.upcomingMovies} />
      </div>
    </div>
    )
  )
}  
