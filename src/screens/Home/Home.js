import React, {useContext, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import fetchApiDataContext from '../../context/FetchApiData/fetchApiDataContext';
import './home.css'
import Trending from '../../components/Trending/Trending';
import Spinner from '../../components/Spinner/Spinner';
import Portal from '../../components/Portal/Portal';
import favContext from '../../context/Favourites/favContext';
import authContext from '../../context/Authentication/authContext';

const Home = () => {
  let navigate = useNavigate();

  const authenticationContext = useContext(authContext)
  const {getUser} = authenticationContext

  const context =  useContext(fetchApiDataContext)
  const {movies, tvShows, loading, showPortal,favUpdated} = context;

  const contextFav = useContext(favContext)
  const {getFav} = contextFav

  useEffect(()=>{
    // localStorage.clear()
    if(localStorage.getItem('token')){
      // console.log(localStorage.getItem('token'));
      // getFav();
      getUser(localStorage.getItem('token'));
    }
    else{
      navigate("/login")
    }

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