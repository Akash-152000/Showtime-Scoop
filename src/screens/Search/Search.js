import React,{useContext} from 'react'
import './search.css'
import trendingContext from '../../context/Trending/trendinContext'
import SearchCard from '../../components/SearchCard/SearchCard'


const Search = () => {
    const context = useContext(trendingContext)
    const {searchData} = context

  return (
    <div className='text-light'>
        <SearchCard data={searchData}/>
    </div>
  )
}

export default Search