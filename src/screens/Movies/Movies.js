import React, { useContext } from 'react'
import trendingContext from '../../context/Trending/trendinContext';
import Spinner from '../../components/Spinner/Spinner';

const Movies = () => {
  const context = useContext(trendingContext);
  const {movieData, loading} = context;
 
  return (
    <div>
    
      {loading?<Spinner/>
        :
        <div>
          Hloo
        </div>
      }
      
    </div>
  )
}

export default Movies