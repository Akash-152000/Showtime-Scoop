import React,{useContext} from 'react'
import './search.css'
import trendingContext from '../../context/Trending/trendinContext'
import SearchCard from '../../components/SearchCard/SearchCard'


const Search = () => {
    const context = useContext(trendingContext)
    const {searchMovieData, searchTvData} = context

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