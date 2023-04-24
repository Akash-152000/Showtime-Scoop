import React,{useContext, useEffect} from 'react'
import './search.css'
import fetchApiDataContext from '../../context/FetchApiData/fetchApiDataContext'
import SearchCard from '../../components/SearchCard/SearchCard'
import favContext from '../../context/Favourites/favContext'


const Search = () => {
    const context = useContext(fetchApiDataContext)
    const {searchMovieData, searchTvData} = context

    const contextFav = useContext(favContext)
    const {getFav} = contextFav

    useEffect(()=>{
      getFav()
    })
  
  return (
    <div className='text-light'>
        <h3 className='mt-5 container mb-5'>Movie Results</h3>
        <SearchCard data={searchMovieData} name='Movies' />
        <h3 className='mt-5 container mb-5'>Tv Show Results</h3>
        <SearchCard data={searchTvData} name='Tv'/>
    </div>
  )
}

export default Search