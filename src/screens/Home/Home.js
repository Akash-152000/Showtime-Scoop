import React, {useContext, useEffect} from 'react'
import fetchApiDataContext from '../../context/FetchApiData/fetchApiDataContext';
import './home.css'
import Trending from '../../components/Trending/Trending';
import Spinner from '../../components/Spinner/Spinner';
import Portal from '../../components/Portal/Portal';
import favContext from '../../context/Favourites/favContext';

const Home = () => {

  const context =  useContext(fetchApiDataContext)
  const {movies, tvShows, loading, showPortal,favUpdated} = context;

  const contextFav = useContext(favContext)
  const {getFav} = contextFav

  useEffect(()=>{
    getFav()
    // console.log(dummFav);
  },[favUpdated])


  return (
    
    <div>
     
      {
        
        loading?
        <div>
          <Spinner/>
        
        </div>
        :
        <div>
          {showPortal&& <Portal/>}
          <Trending data={movies} name="Movies"/>
          <Trending data={tvShows} name="TV Shows"/>
        </div>
      }
      
    </div>
  )
}

export default Home