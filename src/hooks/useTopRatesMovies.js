import React, { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux';
import {  addTopRatedMovies } from '../utils/movieSlice';

export const useTopRatedMovies = () => {
    const dispatch = useDispatch();
    const toprated = useSelector((store) =>store?.movie?.toprated);

    const getTopRatedMovies = async () =>{
    const data = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?page=1",
        API_OPTIONS
    );
    const json = await data.json();
    dispatch(addTopRatedMovies(json.results));
};

    useEffect(()=>{
     !toprated &&  getTopRatedMovies();
    },[]);
}
