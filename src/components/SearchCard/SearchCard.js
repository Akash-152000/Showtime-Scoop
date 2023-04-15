import React from 'react'
import Spinner from '../Spinner/Spinner'
import Card from '../Card/Card'

const SearchCard = (props) => {
  const {data} = props



  return (
    <div>
      {console.log(data)}
      {
        !data.data?<Spinner/>
        :

        <div className='d-flex'>
          {data.data.results.map((ele,i)=>{
                return(
                    <div className='item ' key={i} >
                        {
                          ele.poster_path===null||ele.poster_path===undefined?<div style={{display:"none"}}></div>:<Card title={ele.title} poster={ele.poster_path}/>
                        }
                        
                    </div>
                )
            })}

        </div>
      }

    </div>
  )
}

export default SearchCard