import { useSelector } from "react-redux";
import MovieSlice from "../utils/movieSlice";
import { MovieList } from "./MovieList";


export const GptMovieSuggestion = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);
  if(!movieNames) return;
  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-90">
      <div>
        {movieNames.map((movieName, index) => (
          <MovieList
            title={movieName}
            movies={movieResults[index]}
          />
        ))}
      </div>
    </div>
  )
}
