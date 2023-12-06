import React, { useState } from 'react'
import { IMG_CDN_URL } from '../utils/constant';

import { VideoBackground } from './VideoBackground';

export const MovieCards = ({posterPath}) => {
  
    if(!posterPath) return null;
 

  return (
    <div className="w-36 md:w-48 pr-4"  >
    <img alt="Movie Card" src={IMG_CDN_URL + posterPath} />
    </div>
  )
}
