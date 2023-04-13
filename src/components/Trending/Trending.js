import React from 'react'
import './trending.css'
import Card from '../Card'
import Spinner from '../../components/Spinner/Spinner';

const Trending = (props) => {
    const {data, name} = props

  return (
    <>
    {!data.results?<Spinner/>:
        <div className='text-light container d-flex '>
            {data.results.map((ele,i)=>{
                return(
                    <div key={i}>
                        <Card title={name==="movies"?ele.title:ele.name} poster ={ele.poster_path}/>
                    </div>
                )
            })}

            {}
        
        </div>
    }
        
    </>
  )
}

export default Trending