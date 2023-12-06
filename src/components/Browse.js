
import { Header } from './Header'
import UseNowPlaying from '../hooks/UseNowPlaying'
import { MainContainer } from './MainContainer';
import { SecondaryContainer } from './SecondaryContainer';
import { usePopularMovies } from '../hooks/usePopularMovies';
import { useTopRatedMovies } from '../hooks/useTopRatesMovies';
import { useUpcomingMovies } from '../hooks/useUpcomingMovies';
import { useDispatch, useSelector } from 'react-redux';
import { GptSearch } from './GptSearch';
import { removeGptMovies } from '../utils/gptSlice';
import Footer from './Footer';


export const Browse = () => {
  UseNowPlaying();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  const dispatch = useDispatch();

  const showGptSearch = useSelector((store) => store?.gpt?.showGptSearch);

  return (
    <>
    <div>
    <Header />
    {showGptSearch ? (
      <GptSearch/>
    ):(
    <>
    <MainContainer/>
    <SecondaryContainer/>
    <Footer/>
    </>
    )}
    </div>
    </>
  );
};
