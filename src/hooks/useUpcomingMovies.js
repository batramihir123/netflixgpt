import React, { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux';
import {  addTopRatedMovies, addUpcomingMovies } from '../utils/movieSlice';

export const useUpcomingMovies = () => {
    const dispatch = useDispatch();
    const upcoming = useSelector((store) =>store?.movie?.upcoming);

    const getUpcomingMovies = async () =>{
    const data = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?page=1",
        API_OPTIONS
    );
    const json = await data.json();
    dispatch(addUpcomingMovies(json.results));
};

    useEffect(()=>{
      !upcoming && getUpcomingMovies();
    },[]);
}
