import React, {useContext} from 'react'
import Spinner from '../Spinner/Spinner'
import Card from '../Card/Card'
import Portal from "../../components/Portal/Portal";
import trendingContext from "../../context/Trending/trendinContext";

const SearchCard = (props) => {
  const {data, name} = props

  const context = useContext(trendingContext);
    const { movieData,setPoster, loading,setPage, showPortal, setShowPortal, setTitle, setDesc, setReleaseDate, setRating } = context;



  return (
    <div>
      {
        !data.data?<Spinner/>
        :
        <>
        <div className='d-flex container wrapper'>
        {showPortal&& <Portal/>}
          {data.data.results.map((ele,i)=>{
            return(
                    <div className='item mt-4' key={i} >
                        {
                          ele.poster_path===null||ele.poster_path===undefined?<div style={{display:"none"}}></div>:<Card title={ele.title} ele={ele} name={name}  poster={ele.poster_path}/>
                        }
                        
                    </div>
                )
              })}

        </div>
      </>
      }

    </div>
  )
}

export default SearchCard