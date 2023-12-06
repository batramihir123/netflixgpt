import  {  useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import lang from '../utils/languageConstants';
import { API_OPTIONS } from '../utils/constant';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addGptMovieResult } from '../utils/gptSlice';
import openai from "../utils/openai";
import BeatLoader from 'react-spinners/BeatLoader';

export const GptSearchBar = () => {

    const dispatch = useDispatch();
    const langKey = useSelector((store) => store?.config?.lang);
    const searchText = useRef(null);
    const [isLoading,setIsLoading] = useState(false);

  
    const searchMovieTMDB = async (movie) => {
        const data = await fetch(
          "https://api.themoviedb.org/3/search/movie?query=" +
            movie +
            "&include_adult=false&language=en-US&page=1",
          API_OPTIONS
        );
        const json = await data.json();
    
        return json.results;
      };

      const handleGptSearchClick = async () =>{
        console.log(searchText.current.value);
        setIsLoading(true);

        const gptQuery =
        "Act as a Movie Recommendation system and suggest some movies for the query : " +
        searchText.current.value +
        ". only give me names of 1 movie, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

       const gptResults = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
        });

        if (!gptResults.choices) {
            toast.error('There are no choices', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 5000, // You can adjust the duration
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
          }

          setIsLoading(false);

          console.log(gptResults.choices?.[0]?.message?.content);

          const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

          const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

          const tmdbResults = await Promise.all(promiseArray);

          dispatch(
            addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
          );
    };



  return (
    <div className="pt-[55%] md:pt-[10%] flex justify-center">
    <form
      className="w-screen md:w-1/2 bg-black grid grid-cols-12"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        ref={searchText}
        type="text"
        className=" p-4 m-4 col-span-9"
        placeholder={lang[langKey].gptSearchPlaceholder}
      />
      <button
        className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
        onClick={handleGptSearchClick}
      >
      {isLoading ?( <BeatLoader color="#000000" size={8} />) :( lang[langKey].search)}
      </button>
    </form>
  </div>
  )
}
