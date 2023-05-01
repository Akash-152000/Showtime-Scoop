import React, {useContext} from 'react'
import Spinner from '../Spinner/Spinner'
import Card from '../Card/Card'
import Portal from "../../components/Portal/Portal";
import fetchApiDataContext from "../../context/FetchApiData/fetchApiDataContext";

const SearchCard = (props) => {
  const {data, name} = props

  const context = useContext(fetchApiDataContext);
    const { showPortal} = context;



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