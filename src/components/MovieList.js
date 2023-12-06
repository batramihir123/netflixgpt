import React from 'react'
import { MovieCards } from './MovieCards'

export const MovieList = ({title,movies}) => {
  return (
    movies  &&(
    <div className="px-2 ">
    <h1 className="text-lg md:text-3xl py-4 text-white">{title}</h1>
    <div className="flex overflow-x-auto no-scrollbar">
      <div className="flex">
      {movies.map((movie) =>(
        
      <MovieCards key={movie.id} posterPath ={movie.poster_path}/>
      ))}
      </div>
      </div>
      </div>
    )
  )
}
