import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS } from '../utils/constant';
import { addTrailerVideo } from '../utils/movieSlice';

export const UseMovieTrailer = (movieId) => {

    const dispatch = useDispatch();
    const trailerVideo = useSelector((store)=>store.movie?.trailerVideo);
  
    const getMovieVideos = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/" +
        movieId +
          "/videos?language=en-US",
        API_OPTIONS
      );
      const json = await data.json();
  
      const filterData = json.results.filter((video)=>video.type === "Trailer");
      const trailer = filterData.length ? filterData[0] : json.results[0];
      dispatch(addTrailerVideo(trailer));
    };
  
    useEffect(() => {
      !trailerVideo && getMovieVideos();
    }, []);
  
}
