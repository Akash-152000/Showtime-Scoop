import React, {useContext} from 'react'
import trendingContext from '../../context/Trending/trendinContext';
import './home.css'
import Trending from '../../components/Trending/Trending';
import Spinner from '../../components/Spinner/Spinner';

const Home = () => {

  const context =  useContext(trendingContext)
  const {movies, tvShows, loading} = context;

  return (
    
    <div>
      {
        
        loading?
        <div>
          <Spinner/>
        
        </div>
        :
        <div>
          <h3 className='text-light'>Movies</h3>
          <Trending data={movies} name="movies"/>
          <h3 className='text-light'>Tv Shows</h3>
          <Trending data={tvShows} name="tvShows"/>
        </div>
      }
      
    </div>
  )
}

export default Home