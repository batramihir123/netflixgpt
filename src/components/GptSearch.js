import { BG_URL } from '../utils/constant'
import { GptMovieSuggestion } from './GptMovieSuggestion'
import { GptSearchBar } from './GptSearchBar'

export const GptSearch = () => {
  return (
    <>
    <div className='fixed -z-10'>
    <img className='h-screen w-screen object-cover' src={BG_URL} alt="logo" />
    </div>
    <div className="">
    <GptSearchBar />
    <GptMovieSuggestion />
      </div>
  </>
  )
}
