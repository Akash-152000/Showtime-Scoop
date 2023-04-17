import React, {useContext} from 'react'
import trendingContext from '../../context/Trending/trendinContext';
import './home.css'
import Trending from '../../components/Trending/Trending';
import Spinner from '../../components/Spinner/Spinner';


const Home = () => {

  const context =  useContext(trendingContext)
  const {movies, tvShows, loading, showPortal,setShowPortal} = context;


  return (
    
    <div>
     
      {
        
        loading?
        <div>
          <Spinner/>
        
        </div>
        :
        <div>
          <Trending data={movies} name="Movies"/>
          <Trending data={tvShows} name="TV Show"/>
        </div>
      }
      
    </div>
  )
}

export default Home